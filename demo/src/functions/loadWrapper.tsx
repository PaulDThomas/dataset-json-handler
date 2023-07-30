import { iFetchReturn } from '../interfaces/iFetchReturn';
import { iRequestStatus } from '../interfaces/iRequestStatus';
import _ from 'lodash';

export const loadWrapper = async <T1 extends iFetchReturn, T2>(
  loadFunction: (target: T2, controller: AbortController) => Promise<T1>,
  target: T2,
  status: iRequestStatus<T2>,
  setStatus: (ret: iRequestStatus<T2>) => void,
): Promise<T1 | null> => {
  // Assume nothing is happening
  const doLoad =
    (status.requesting && !_.isEqual(status.requestingId, target)) ||
    (!status.requesting && !_.isEqual(status.requestedId, target));
  // Check there is a need to request
  if (doLoad && status.cancel) {
    status.cancel();
  }

  // Stop if hierarchy is less than zero or already requesting, or already errored
  if (doLoad && !status.error) {
    const controller = new AbortController();
    setStatus({
      requesting: true,
      requestingId: target,
      cancel: () => controller.abort(),
      error: false,
    });
    const response: T1 = await loadFunction(target, controller);
    if (response.success) {
      setStatus({
        requesting: false,
        requestedId: target,
        error: false,
      });
      return response;
    } else {
      console.warn(`Failed to load: ${response.ErrorText}`);
      // Do nothing on a cancellation error
      if (response.ErrorText !== 'Request cancelled') {
        setStatus({
          requesting: false,
          error: true,
          errorText: response.ErrorText,
        });
        return response;
      }
    }
  }
  return null;
};
