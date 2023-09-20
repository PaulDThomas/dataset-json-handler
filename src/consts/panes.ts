import { SummaryTableGenerator } from "../main";
import { PaneForData } from "../components/main/PaneForData";
import { PaneForItems } from "../components/main/PaneForItems";
import { ListingGenerator } from "../components/main/ListingGenerator";

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
