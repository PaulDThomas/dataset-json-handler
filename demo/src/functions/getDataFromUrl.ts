import { CdiscDatasetJson } from '../../../src/main';
import { iFetchReturn } from '../interfaces/iFetchReturn';

export interface datasetJsonReturn extends iFetchReturn {
  datasetJson?: CdiscDatasetJson;
}

export const getDataFromUrl = async (
  url: string,
  controller: AbortController,
): Promise<datasetJsonReturn> => {
  const _url = new URL(url);
  if (!_url) {
    return new Promise((resolve) =>
      resolve({
        success: false,
        ErrorText: 'getDataFromUrl: Invalid URL',
      }),
    );
  }
  try {
    const signal = controller.signal;
    const response = await fetch(_url, { signal });
    const json = await response.json();
    console.log(json);
    return {
      success: true,
      datasetJson: json,
    };
  } catch (error: unknown) {
    console.warn(error);
    return {
      success: false,
    };
  }
};
