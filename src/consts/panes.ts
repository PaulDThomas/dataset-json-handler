import { ListingGenerator } from "../components/main/ListingGenerator";
import { PaneForData } from "../components/main/PaneForData";
import { PaneForItems } from "../components/main/PaneForItems";
import { SummaryTableGenerator } from "../components/main/SummaryTableGenerator";

export type Pane = "items" | "data" | "summary" | "listing";

export const panes: {
  value: Pane;
  label: string;
  element: () => JSX.Element;
}[] = [
  { value: "items", label: "Items", element: PaneForItems },
  { value: "data", label: "Data", element: PaneForData },
  { value: "summary", label: "Summary table", element: SummaryTableGenerator },
  { value: "listing", label: "Listing", element: ListingGenerator },
];
