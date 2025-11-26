export type ReportingEventId = string;
export type ReferenceDocumentId = string;
export type TerminologyExtensionId = string;
export type SponsorTermId = string;
export type AnalysisOutputCategorizationId = string;
export type AnalysisOutputCategoryId = string;
export type AnalysisSetId = string;
export type DataSubsetId = string;
export type GroupingFactorId = string;
export type GroupId = string;
export type AnalysisMethodId = string;
export type OperationId = string;
export type ReferencedOperationRelationshipId = string;
export type AnalysisId = string;
export type DisplaySubSectionId = string;
export type OutputId = string;
export type OutputDisplayId = string;
/**
 * The file format of the file containing output from analyses.
 */
export enum OutputFileTypeEnum {
  /** Portable Document Format (PDF) */
  pdf = "pdf",
  /** Rich Text Format (RTF) */
  rtf = "rtf",
  /** Plain text */
  txt = "txt",
}
/**
 * Boolean operators denoting a logical operation (e.g., and, or, not).
 */
export enum ExpressionLogicalOperatorEnum {
  AND = "AND",
  OR = "OR",
  NOT = "NOT",
}
/**
 * Comparison operators indicating how the value of a variable is compared to a (list of) prespecified value(s).
 */
export enum ConditionComparatorEnum {
  /** Is equal to */
  EQ = "EQ",
  /** Is not equal to */
  NE = "NE",
  /** Is greater than */
  GT = "GT",
  /** Is greater than or equal to */
  GE = "GE",
  /** Is less than */
  LT = "LT",
  /** Is less than or equal to */
  LE = "LE",
  /** Is in */
  IN = "IN",
  /** Is not in */
  NOTIN = "NOTIN",
}
/**
 * Types of display section that contain one or more pieces of informational text.
 */
export enum DisplaySectionTypeEnum {
  /** Lines of text appearing above the title and containing additional generic information such as study identifier or page numbering. */
  Header = "Header",
  /** The title is a caption of a table beginning with "Table" followed by sequenced numbers or letters and separated by full stops. The title includes additional lines describing the content. */
  Title = "Title",
  /** Optional text placed in the column header for a column containing row/stub labels. */
  Rowlabel_Header = "Rowlabel Header",
  /** Lines of text placed immediately after the body of the table containing statements explaining the use of terms or values. May be prefaced with a word such as 'Note:'. */
  Legend = "Legend",
  /** Lines of text defining abbreviations, acronyms, and terms used in the body of the display. */
  Abbreviation = "Abbreviation",
  /** Placed after the abbreviations and definitions, if any. Footnotes lead with symbols (asterisk, dagger, double dagger, or section symbol) or superscripted letters (a, b, c) or numbers (1, 2, 3) which are in the table behind units of measure or words. Footnotes add information regarding the associated values where they occur in the body. */
  Footnote = "Footnote",
  /** Lines of text appearing below any footnote and containing additional information such as traceability of the source program or page numbering. */
  Footer = "Footer",
}
/**
 * The role that the referenced operation's result plays in the calculation of the result of this operation.
 */
export enum OperationRoleEnum {
  /** The dividend of a fraction. */
  NUMERATOR = "NUMERATOR",
  /** The divisor of a fraction. */
  DENOMINATOR = "DENOMINATOR",
}
/**
 * The rationale for performing this analysis. It indicates when the analysis was planned.
 */
export enum AnalysisReasonEnum {
  /** The analysis is specified in a protocol. */
  SPECIFIED_IN_PROTOCOL = "SPECIFIED IN PROTOCOL",
  /** The analysis is specified in a statistical analysis plan. */
  SPECIFIED_IN_SAP = "SPECIFIED IN SAP",
  /** The analysis was triggered by findings in the data. */
  DATA_DRIVEN = "DATA DRIVEN",
  /** The analysis has been requested by a regulatory agency. */
  REQUESTED_BY_REGULATORY_AGENCY = "REQUESTED BY REGULATORY AGENCY",
}
/**
 * The purpose of the analysis within the body of evidence (e.g., section in the clinical study report).
 */
export enum AnalysisPurposeEnum {
  /** The outcome measure(s) of greatest importance specified in the protocol, usually the one(s) used in the power calculation, to evaluate the primary endpoint(s) associated with the primary study objective(s). (After Clinicaltrials.gov) */
  PRIMARY_OUTCOME_MEASURE = "PRIMARY OUTCOME MEASURE",
  /** The outcome measure(s) that is part of a pre-specified analysis plan used to evaluate the secondary endpoint(s) associated with secondary study objective(s) and/or used to evaluate any measure(s) ancillary to the primary or secondary endpoint(s). (After Clinicaltrials.gov). */
  SECONDARY_OUTCOME_MEASURE = "SECONDARY OUTCOME MEASURE",
  /** The outcome measure(s) that is part of a pre-specified analysis plan used to evaluate the exploratory endpoint(s) associated with exploratory study objective(s) and/or any other measures, excluding post-hoc measures, that are a focus of the study. (After clinicaltrials.gov) */
  EXPLORATORY_OUTCOME_MEASURE = "EXPLORATORY OUTCOME MEASURE",
}
/**
 * Extensible ARS enumerations.
 */
export enum ExtensibleTerminologyEnum {
  /** The rationale for performing this analysis. It indicates when the analysis was planned. */
  AnalysisReasonEnum = "AnalysisReasonEnum",
  /** The purpose of the analysis within the body of evidence (e.g., section in the clinical study report). */
  AnalysisPurposeEnum = "AnalysisPurposeEnum",
  /** The role that the referenced operation's result plays in the calculation of the result of this operation. */
  OperationRoleEnum = "OperationRoleEnum",
  /** The file format of the file containing output from analyses. */
  OutputFileTypeEnum = "OutputFileTypeEnum",
}
/**
 * Type of reference for page references.
 */
export enum PageRefTypeEnum {
  /** References are to page numbers. */
  PhysicalRef = "PhysicalRef",
  /** References are to named destinations in the referenced document. */
  NamedDestination = "NamedDestination",
}

/**
 * An object with a name.
 */
export interface NamedObject {
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isNamedObject(o: object): o is NamedObject {
  return "name" in o;
}

export function toNamedObject(o: NamedObject): NamedObject {
  return {
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A set of analyses and outputs created to meet a specific reporting requirement, such as a CSR or interim analysis.
 */
export interface ReportingEvent extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** An ordinal indicating the version of the identified instance of the class. */
  version?: number;
  /** The main list of the analyses and outputs defined for the reporting event. */
  mainListOfContents: ListOfContents;
  /** Other lists of the analyses and outputs defined for the reporting event. */
  otherListsOfContents?: ListOfContents[];
  /** External documents containing information referenced for the reporting event. */
  referenceDocuments?: ReferenceDocument[];
  /** Any sponsor-defined extensions to extensible terminology. */
  terminologyExtensions?: TerminologyExtension[];
  /** Sets of related implementer-defined categories that can be used to categorize analyses or outputs. */
  analysisOutputCategorizations?: AnalysisOutputCategorization[];
  /** The analysis sets (subject populations) defined for the reporting event. */
  analysisSets?: AnalysisSet[];
  /** Subsets of data identified by selection criteria for inclusion in analysis definitions. */
  dataSubsets?: DataSubset[];
  /** Characteristics used to subdivide the subject population (e.g., treatment, sex, age group) or data records in analysis datasets (e.g., visit, system organ class). */
  analysisGroupings?: GroupingFactor[];
  /** The defined methods used to analyze any analysis variable. */
  methods?: AnalysisMethod[];
  /** The analyses defined for the reporting event. */
  analyses?: Analysis[];
  /** Display section specifications that may be applied to any display. */
  globalDisplaySections?: GlobalDisplaySection[];
  /** The outputs defined for the reporting event. */
  outputs?: Output[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isReportingEvent(o: object): o is ReportingEvent {
  return "id" in o && "mainListOfContents" in o && "name" in o;
}

export function toReportingEvent(o: ReportingEvent): ReportingEvent {
  return {
    id: o.id ?? "",
    version: o.version ?? 0,
    mainListOfContents: o.mainListOfContents ?? {},
    otherListsOfContents: o.otherListsOfContents ?? [],
    referenceDocuments: o.referenceDocuments ?? [],
    terminologyExtensions: o.terminologyExtensions ?? [],
    analysisOutputCategorizations: o.analysisOutputCategorizations ?? [],
    analysisSets: o.analysisSets ?? [],
    dataSubsets: o.dataSubsets ?? [],
    analysisGroupings: o.analysisGroupings ?? [],
    methods: o.methods ?? [],
    analyses: o.analyses ?? [],
    globalDisplaySections: o.globalDisplaySections ?? [],
    outputs: o.outputs ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A structured list of analyses and outputs included in the reporting event.
 */
export interface ListOfContents extends NamedObject {
  /** A structured list of the analyses and outputs defined for the reporting event. */
  contentsList: NestedList;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isListOfContents(o: object): o is ListOfContents {
  return "contentsList" in o && "name" in o;
}

export function toListOfContents(o: ListOfContents): ListOfContents {
  return {
    contentsList: o.contentsList ?? {},
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A list of items (analyses or outputs) that may be organized within sub-lists.
 */
export interface NestedList {
  /** Items in the list. Each item may include a reference to an analysis, a reference to an output, or a sub-list. */
  listItems?: OrderedListItem[];
}

export function isNestedList(o: object): o is NestedList {
  return "listItems" in o;
}

export function toNestedList(o: NestedList): NestedList {
  return {
    listItems: o.listItems ?? [],
  };
}

/**
 * An abstract class containing attributes used to position class instances within a hierarchical tree.
 */
export interface LevelOrder {
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isLevelOrder(o: object): o is LevelOrder {
  return "level" in o && "order" in o;
}

export function toLevelOrder(o: LevelOrder): LevelOrder {
  return {
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * An item (analysis, output or sub-list) ordered relative to other items within a list or sub-list.
 */
export interface OrderedListItem extends NamedObject, LevelOrder {
  /** The identifier of the referenced analysis. */
  analysisId?: AnalysisId;
  /** The identifier of the referenced output. */
  outputId?: OutputId;
  /** A sub-list of items (analyses or outputs) that may be further organized within sub-lists. */
  sublist?: NestedList;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isOrderedListItem(o: object): o is OrderedListItem {
  return "level" in o && "order" in o && "name" in o;
}

export function toOrderedListItem(o: OrderedListItem): OrderedListItem {
  return {
    analysisId: o.analysisId,
    outputId: o.outputId,
    sublist: o.sublist ?? {},
    level: o.level ?? 0,
    order: o.order ?? 0,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * An external document containing supporting documentation or programming code.
 */
export interface ReferenceDocument extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A path (relative or absolute) indicating the location of the file. */
  location?: string;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isReferenceDocument(o: object): o is ReferenceDocument {
  return "id" in o && "name" in o;
}

export function toReferenceDocument(o: ReferenceDocument): ReferenceDocument {
  return {
    id: o.id ?? "",
    location: o.location,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * An extensible set of controlled terminology that has been extended with at least one sponsor-defined term.
 */
export interface TerminologyExtension {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The name of the extensible enumeration. */
  enumeration?: string;
  /** The sponsor-defined terms added to the extensible terminology. */
  sponsorTerms: SponsorTerm[];
}

export function isTerminologyExtension(o: object): o is TerminologyExtension {
  return "id" in o && "sponsorTerms" in o;
}

export function toTerminologyExtension(o: TerminologyExtension): TerminologyExtension {
  return {
    id: o.id ?? "",
    enumeration: o.enumeration,
    sponsorTerms: o.sponsorTerms ?? [],
  };
}

/**
 * A sponsor-defined term that is included in an extensible set of controlled terminology.
 */
export interface SponsorTerm {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The specific value expected for submissions. */
  submissionValue: string;
  /** A textual description of the instance of the class. */
  description?: string;
}

export function isSponsorTerm(o: object): o is SponsorTerm {
  return "id" in o && "submissionValue" in o;
}

export function toSponsorTerm(o: SponsorTerm): SponsorTerm {
  return {
    id: o.id ?? "",
    submissionValue: o.submissionValue ?? "",
    description: o.description ?? "",
  };
}

/**
 * The term used for an attribute whose terminology is extensible.
 */
export interface ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm?: string;
  /** The identifier of the referenced sponsor term. */
  sponsorTermId?: SponsorTermId;
}

export function isExtensibleTerminologyTerm(o: object): o is ExtensibleTerminologyTerm {
  return "controlledTerm" in o || "sponsorTermId" in o;
}

export function toExtensibleTerminologyTerm(
  o: ExtensibleTerminologyTerm,
): ExtensibleTerminologyTerm {
  return {
    controlledTerm: o.controlledTerm ?? "",
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * A set of related implementer-defined categories that can be used to categorize analyses or outputs.
 */
export interface AnalysisOutputCategorization {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** Implementer-defined categories of analyses/outputs, each of which may include one or more sub-categorization. */
  categories: AnalysisOutputCategory[];
}

export function isAnalysisOutputCategorization(o: object): o is AnalysisOutputCategorization {
  return "id" in o && "categories" in o;
}

export function toAnalysisOutputCategorization(
  o: AnalysisOutputCategorization,
): AnalysisOutputCategorization {
  return {
    id: o.id ?? "",
    label: o.label ?? "",
    categories: o.categories ?? [],
  };
}

/**
 * An implementer-defined category of analyses/outputs, which may include one or more sub-categorization.
 */
export interface AnalysisOutputCategory {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** Sets of related implementer-defined sub-categories that can be used to categorize analyses or outputs. */
  subCategorizations?: AnalysisOutputCategorization[];
}

export function isAnalysisOutputCategory(o: object): o is AnalysisOutputCategory {
  return "id" in o;
}

export function toAnalysisOutputCategory(o: AnalysisOutputCategory): AnalysisOutputCategory {
  return {
    id: o.id ?? "",
    label: o.label ?? "",
    subCategorizations: o.subCategorizations ?? [],
  };
}

/**
 * Selection criteria defined as either a simple condition ([variable] [comparator] [value(s)]) or a compound expression that may combine simple conditions or compound expressions.
 */
export interface WhereClause extends LevelOrder {
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: WhereClauseCompoundExpression;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isWhereClause(o: object): o is WhereClause {
  return "level" in o && "order" in o;
}

export function toWhereClause(o: WhereClause): WhereClause {
  return {
    condition: o.condition ?? {},
    compoundExpression: o.compoundExpression,
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)]
 */
export interface WhereClauseCondition {
  /** The name of the analysis dataset. */
  dataset?: string;
  /** The name of the variable. */
  variable?: string;
  /** Comparison operator indicating how the variable is compared to the value(s). */
  comparator?: string;
  /** The value(s) for comparison with the variable. */
  value?: string[];
}

export function isWhereClauseCondition(o: object): o is WhereClauseCondition {
  return "dataset" in o || "variable" in o || "comparator" in o || "value" in o;
}

export function toWhereClauseCondition(o: WhereClauseCondition): WhereClauseCondition {
  return {
    dataset: o.dataset ?? "",
    variable: o.variable ?? "",
    comparator: o.comparator,
    value: o.value ?? [],
  };
}

/**
 * An abstract class indicating an identified where clause (i.e., `AnalysisSet`, `DataSubset` or `Group`) referenced by identifier (`subClauseId`) as the sub-clause in a compound expression.
 */
export interface ReferencedWhereClause extends LevelOrder {
  /** The identifier of the analysis set, data subset or group referenced in the compound expression. */
  subClauseId: string;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isReferencedWhereClause(o: object): o is ReferencedWhereClause {
  return "subClauseId" in o && "level" in o && "order" in o;
}

export function toReferencedWhereClause(o: ReferencedWhereClause): ReferencedWhereClause {
  return {
    subClauseId: o.subClauseId ?? "",
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * An abstract class containing all attributes that may be specified for a sub-clause of a compound expression. In practice, each sub-clause will be either a fully-defined `WhereClause` (containing either a `condition` or a `compoundExpression`) or a `ReferencedWhereClause` (containing a `subClauseId`).
 */
export interface SubClause extends LevelOrder, WhereClause, ReferencedWhereClause {
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: WhereClauseCompoundExpression;
  /** The identifier of the analysis set, data subset or group referenced in the compound expression. */
  subClauseId: string;
}

export function isSubClause(o: object): o is SubClause {
  return "level" in o && "order" in o;
}

export function toSubClause(o: SubClause): SubClause {
  return {
    level: o.level ?? 0,
    order: o.order ?? 0,
    condition: o.condition ?? {},
    compoundExpression: o.compoundExpression,
    subClauseId: o.subClauseId ?? "",
  };
}

/**
 * An abstract class representing a compound expression consisting of either two or more sub-clauses combined with the `AND` or `OR` logical operator, or a single sub-clause negated with the `NOT` logical operator. Each sub-clause is either a fully-defined `WhereClause` (containing either a `condition` or a `compoundExpression`) or a `ReferencedWhereClause` (containing a `subClauseId`).
 */
export interface WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: SubClause[];
}

export function isWhereClauseCompoundExpression(o: object): o is WhereClauseCompoundExpression {
  return "logicalOperator" in o;
}

export function toWhereClauseCompoundExpression(
  o: WhereClauseCompoundExpression,
): WhereClauseCompoundExpression {
  return {
    logicalOperator: o.logicalOperator,
    whereClauses: o.whereClauses ?? [],
  };
}

/**
 * A set of subjects whose data are to be included in the main analyses. This should be defined in the statistical section of the protocol. NOTE: There are a number of potential analysis sets, including, for example, the set based upon the intent-to-treat principle. [ICH E9]
 */
export interface AnalysisSet extends NamedObject, WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundSetExpression;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isAnalysisSet(o: object): o is AnalysisSet {
  return "id" in o && "name" in o && "level" in o && "order" in o;
}

export function toAnalysisSet(o: AnalysisSet): AnalysisSet {
  return {
    id: o.id ?? "",
    condition: o.condition ?? {},
    compoundExpression: o.compoundExpression,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * An `AnalysisSet` referenced by identifier (`subClauseId`) as the sub-clause of a compound expression.
 */
export interface ReferencedAnalysisSet extends ReferencedWhereClause {
  /** The identifier of the analysis set, data subset or group referenced in the compound expression. */
  subClauseId: AnalysisSetId;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isReferencedAnalysisSet(o: object): o is ReferencedAnalysisSet {
  return "subClauseId" in o && "level" in o && "order" in o;
}

export function toReferencedAnalysisSet(o: ReferencedAnalysisSet): ReferencedAnalysisSet {
  return {
    subClauseId: o.subClauseId,
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A compound expression consisting of either two or more sub-clauses combined with the `AND` or `OR` logical operator, or a single sub-clause negated with the `NOT` logical operator. Each sub-clause is either a fully-defined `WhereClause` (containing either a `condition` or a `compoundExpression`) or a `ReferencedAnalysisSet` (containing a `subClauseId` indicating the `id` of the referenced `AnalysisSet`).
 */
export interface CompoundSetExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: SubClause[];
}

export function isCompoundSetExpression(o: object): o is CompoundSetExpression {
  return "logicalOperator" in o;
}

export function toCompoundSetExpression(o: CompoundSetExpression): CompoundSetExpression {
  return {
    logicalOperator: o.logicalOperator,
    whereClauses: o.whereClauses ?? [],
  };
}

/**
 * A subset of data identified by selection criteria for inclusion in the analysis.
 */
export interface DataSubset extends NamedObject, WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundSubsetExpression;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isDataSubset(o: object): o is DataSubset {
  return "id" in o && "name" in o && "level" in o && "order" in o;
}

export function toDataSubset(o: DataSubset): DataSubset {
  return {
    id: o.id ?? "",
    condition: o.condition ?? {},
    compoundExpression: o.compoundExpression,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A `DataSubset` referenced by identifier (`subClauseId`) as the sub-clause of a compound expression.
 */
export interface ReferencedDataSubset extends ReferencedWhereClause {
  /** The identifier of the analysis set, data subset or group referenced in the compound expression. */
  subClauseId: DataSubsetId;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isReferencedDataSubset(o: object): o is ReferencedDataSubset {
  return "subClauseId" in o && "level" in o && "order" in o;
}

export function toReferencedDataSubset(o: ReferencedDataSubset): ReferencedDataSubset {
  return {
    subClauseId: o.subClauseId,
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A compound expression consisting of either two or more sub-clauses combined with the `AND` or `OR` logical operator, or a single sub-clause negated with the `NOT` logical operator. Each sub-clause is either a fully-defined `WhereClause` (containing either a `condition` or a `compoundExpression`) or a `ReferencedDataSubset` (containing a `subClauseId` indicating the `id` of the referenced `DataSubset`).
 */
export interface CompoundSubsetExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: SubClause[];
}

export function isCompoundSubsetExpression(o: object): o is CompoundSubsetExpression {
  return "logicalOperator" in o;
}

export function toCompoundSubsetExpression(o: CompoundSubsetExpression): CompoundSubsetExpression {
  return {
    logicalOperator: o.logicalOperator,
    whereClauses: o.whereClauses ?? [],
  };
}

/**
 * A factor used to subdivide either the subject population or data records in an analysis dataset for analysis.
 */
export interface GroupingFactor extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** For groupings based on a single variable, a reference to the dataset containing the variable upon which grouping is based. */
  groupingDataset?: string;
  /** For groupings based on a single variable, a reference to the dataset variable upon which grouping is based. */
  groupingVariable?: string;
  /** Indicates whether the groups defined by the grouping are prespecified (false) or obtained from distinct data values of the groupingVariable (true). */
  dataDriven: boolean;
  /** The pre-specified groups within the grouping. */
  groups?: Group[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isGroupingFactor(o: object): o is GroupingFactor {
  return "id" in o && "dataDriven" in o && "name" in o;
}

export function toGroupingFactor(o: GroupingFactor): GroupingFactor {
  return {
    id: o.id ?? "",
    groupingDataset: o.groupingDataset ?? "",
    groupingVariable: o.groupingVariable ?? "",
    dataDriven: o.dataDriven ?? false,
    groups: o.groups ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A subdivision of the subject population or analysis dataset record set based on a defined factor.
 */
export interface Group extends NamedObject, WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundGroupExpression;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isGroup(o: object): o is Group {
  return "id" in o && "name" in o && "level" in o && "order" in o;
}

export function toGroup(o: Group): Group {
  return {
    id: o.id ?? "",
    condition: o.condition ?? {},
    compoundExpression: o.compoundExpression,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A `Group` referenced by identifier (`subClauseId`) as the sub-clause of a compound expression.
 */
export interface ReferencedGroup extends ReferencedWhereClause {
  /** The identifier of the analysis set, data subset or group referenced in the compound expression. */
  subClauseId: GroupId;
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
}

export function isReferencedGroup(o: object): o is ReferencedGroup {
  return "subClauseId" in o && "level" in o && "order" in o;
}

export function toReferencedGroup(o: ReferencedGroup): ReferencedGroup {
  return {
    subClauseId: o.subClauseId,
    level: o.level ?? 0,
    order: o.order ?? 0,
  };
}

/**
 * A compound expression consisting of either two or more sub-clauses combined with the `AND` or `OR` logical operator, or a single sub-clause negated with the `NOT` logical operator. Each sub-clause is either a fully-defined `WhereClause` (containing either a `condition` or a `compoundExpression`) or a `ReferencedGroup` (containing a `subClauseId` indicating the `id` of the referenced `Group`).
 */
export interface CompoundGroupExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: SubClause[];
}

export function isCompoundGroupExpression(o: object): o is CompoundGroupExpression {
  return "logicalOperator" in o;
}

export function toCompoundGroupExpression(o: CompoundGroupExpression): CompoundGroupExpression {
  return {
    logicalOperator: o.logicalOperator,
    whereClauses: o.whereClauses ?? [],
  };
}

/**
 * A set of one or more statistical operations.
 */
export interface AnalysisMethod extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** The calculations performed for the method. Each operation generates a statistical result. */
  operations: Operation[];
  /** Template programming statements used to perform the statistical operations for any analysis that uses this method. */
  codeTemplate?: AnalysisProgrammingCodeTemplate;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isAnalysisMethod(o: object): o is AnalysisMethod {
  return "id" in o && "operations" in o && "name" in o;
}

export function toAnalysisMethod(o: AnalysisMethod): AnalysisMethod {
  return {
    id: o.id ?? "",
    documentRefs: o.documentRefs ?? [],
    operations: o.operations ?? [],
    codeTemplate: o.codeTemplate,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A reference to an external document.
 */
export interface DocumentReference {
  /** The identifier of the referenced document. */
  referenceDocumentId: ReferenceDocumentId;
  /** A list of references to specific parts of a document, which may be referenced as a list of one or more page numbers, a range of page numbers, or a list of named destinations in the document (e.g. bookmarks). */
  pageRefs?: PageRef[];
}

export function isDocumentReference(o: object): o is DocumentReference {
  return "referenceDocumentId" in o;
}

export function toDocumentReference(o: DocumentReference): DocumentReference {
  return {
    referenceDocumentId: o.referenceDocumentId,
    pageRefs: o.pageRefs ?? [],
  };
}

/**
 * A reference to a specific part of a document as indicated by a list of one or more page numbers, a range of page numbers, or a list of named destinations in the document (e.g. bookmarks).
 */
export interface PageRef {
  /** The type of reference for page references. */
  refType: string;
  /** Alternative label to provide a more specific and description to a page link. */
  label?: string;
  /** One or more named document references which each correspond with a page. */
  pageNames?: string[];
  /** One or more page numbers. */
  pageNumbers?: number[];
  /** The page number of the first page in a range of pages. */
  firstPage?: number;
  /** The page number of the last page in a range of pages. */
  lastPage?: number;
}

export function isPageRef(o: object): o is PageRef {
  return "refType" in o;
}

export function toPageRef(o: PageRef): PageRef {
  return {
    refType: o.refType,
    label: o.label ?? "",
    pageNames: o.pageNames ?? [],
    pageNumbers: o.pageNumbers ?? [],
    firstPage: o.firstPage ?? 0,
    lastPage: o.lastPage ?? 0,
  };
}

/**
 * One or more individual pages in the reference document, referenced by page number.
 */
export interface PageNumberListRef extends PageRef {
  /** The type of reference for page references. */
  refType: string;
  /** Alternative label to provide a more specific and description to a page link. */
  label?: string;
  /** NOT USED */
  pageNames?: string[];
  /** One or more page numbers. */
  pageNumbers: number[];
  /** NOT USED */
  firstPage?: number;
  /** NOT USED */
  lastPage?: number;
}

export function isPageNumberListRef(o: object): o is PageNumberListRef {
  return "refType" in o && "pageNumbers" in o;
}

export function toPageNumberListRef(o: PageNumberListRef): PageNumberListRef {
  return {
    refType: o.refType,
    label: o.label ?? "",
    pageNames: o.pageNames ?? [],
    pageNumbers: o.pageNumbers ?? [],
    firstPage: o.firstPage ?? 0,
    lastPage: o.lastPage ?? 0,
  };
}

/**
 * A range of pages in the reference document, indicated by the first and last page number in the range.
 */
export interface PageNumberRangeRef extends PageRef {
  /** The type of reference for page references. */
  refType: string;
  /** Alternative label to provide a more specific and description to a page link. */
  label?: string;
  /** NOT USED */
  pageNames?: string[];
  /** NOT USED */
  pageNumbers?: number[];
  /** The page number of the first page in a range of pages. */
  firstPage: number;
  /** The page number of the last page in a range of pages. */
  lastPage: number;
}

export function isPageNumberRangeRef(o: object): o is PageNumberRangeRef {
  return "refType" in o && "firstPage" in o && "lastPage" in o;
}

export function toPageNumberRangeRef(o: PageNumberRangeRef): PageNumberRangeRef {
  return {
    refType: o.refType,
    label: o.label ?? "",
    pageNames: o.pageNames ?? [],
    pageNumbers: o.pageNumbers ?? [],
    firstPage: o.firstPage ?? 0,
    lastPage: o.lastPage ?? 0,
  };
}

/**
 * One or more pages in the reference document, referenced by named destination.
 */
export interface PageNameRef extends PageRef {
  /** The type of reference for page references. */
  refType: string;
  /** Alternative label to provide a more specific and description to a page link. */
  label?: string;
  /** One or more named document references which each correspond with a page. */
  pageNames: string[];
  /** NOT USED */
  pageNumbers?: number[];
  /** NOT USED */
  firstPage?: number;
  /** NOT USED */
  lastPage?: number;
}

export function isPageNameRef(o: object): o is PageNameRef {
  return "refType" in o && "pageNames" in o;
}

export function toPageNameRef(o: PageNameRef): PageNameRef {
  return {
    refType: o.refType,
    label: o.label ?? "",
    pageNames: o.pageNames ?? [],
    pageNumbers: o.pageNumbers ?? [],
    firstPage: o.firstPage ?? 0,
    lastPage: o.lastPage ?? 0,
  };
}

/**
 * A statistical operation that produces a single analysis result value as part of an analysis method.
 */
export interface Operation extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** Relationships to other operations indicating how the result of the referenced operation are used in the calculation of the result for this operation. */
  referencedOperationRelationships?: ReferencedOperationRelationship[];
  /** The default pattern or format to apply to the result for display. */
  resultPattern?: string;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isOperation(o: object): o is Operation {
  return "id" in o && "order" in o && "name" in o;
}

export function toOperation(o: Operation): Operation {
  return {
    id: o.id ?? "",
    order: o.order ?? 0,
    referencedOperationRelationships: o.referencedOperationRelationships ?? [],
    resultPattern: o.resultPattern ?? "",
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A reference to a statistical operation whose results are used in the calculation of the result for this operation.
 */
export interface ReferencedOperationRelationship {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The role that the referenced operation's result plays in the calculation of the result of the parent operation. */
  referencedOperationRole: ExtensibleTerminologyTerm;
  /** The identifier of the referenced operation. */
  operationId: OperationId;
  /** The identifier of the referenced analysis. */
  analysisId?: AnalysisId;
  /** A textual description of the instance of the class. */
  description?: string;
}

export function isReferencedOperationRelationship(o: object): o is ReferencedOperationRelationship {
  return "id" in o && "referencedOperationRole" in o && "operationId" in o;
}

export function toReferencedOperationRelationship(
  o: ReferencedOperationRelationship,
): ReferencedOperationRelationship {
  return {
    id: o.id ?? "",
    referencedOperationRole: o.referencedOperationRole ?? {},
    operationId: o.operationId,
    analysisId: o.analysisId,
    description: o.description ?? "",
  };
}

/**
 * The role that the referenced operation's result plays in the calculation of the result of this operation.
 */
export interface OperationRole extends ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm: string;
  /** NOT USED */
  sponsorTermId?: SponsorTermId;
}

export function isOperationRole(o: object): o is OperationRole {
  return "controlledTerm" in o;
}

export function toOperationRole(o: OperationRole): OperationRole {
  return {
    controlledTerm: o.controlledTerm,
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * The sponsor-defined role that the referenced operation's result plays in the calculation of the result of this operation.
 */
export interface SponsorOperationRole extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=OperationRoleEnum */
  sponsorTermId: SponsorTermId;
}

export function isSponsorOperationRole(o: object): o is SponsorOperationRole {
  return "sponsorTermId" in o;
}

export function toSponsorOperationRole(o: SponsorOperationRole): SponsorOperationRole {
  return {
    controlledTerm: o.controlledTerm ?? "",
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * Programming statements and/or a reference to a used as a template for creation of a program to perform method operations for a specific analysis.
 */
export interface AnalysisProgrammingCodeTemplate {
  /** The name and version of the computer language used for the actual programming statements provided. */
  context: string;
  /** Programming statements used to perform the specific analysis. */
  code?: string;
  /** A reference to the document containing programming code. */
  documentRef?: DocumentReference;
  /** Parameters whose values will be used to generate or execute the programming code for a specific analysis. */
  parameters?: TemplateCodeParameter[];
}

export function isAnalysisProgrammingCodeTemplate(o: object): o is AnalysisProgrammingCodeTemplate {
  return "context" in o;
}

export function toAnalysisProgrammingCodeTemplate(
  o: AnalysisProgrammingCodeTemplate,
): AnalysisProgrammingCodeTemplate {
  return {
    context: o.context ?? "",
    code: o.code ?? "",
    documentRef: o.documentRef,
    parameters: o.parameters ?? [],
  };
}

/**
 * A replacement parameter whose value is substituted in template programming code to create statements required for a specific analysis.
 */
export interface CodeParameter extends NamedObject {
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isCodeParameter(o: object): o is CodeParameter {
  return "name" in o;
}

export function toCodeParameter(o: CodeParameter): CodeParameter {
  return {
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A replacement parameter whose value is substituted in template programming code to create statements required for a specific analysis.
 */
export interface TemplateCodeParameter extends CodeParameter {
  /** A reference to the prespecified source of the value for the parameter. */
  valueSource?: string;
  /** The value to be used for the parameter when the method is used in an analysis. Multiple values may be specified to indicate a choice. */
  value?: string[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isTemplateCodeParameter(o: object): o is TemplateCodeParameter {
  return "name" in o;
}

export function toTemplateCodeParameter(o: TemplateCodeParameter): TemplateCodeParameter {
  return {
    valueSource: o.valueSource ?? "",
    value: o.value ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * An analysis that is designed to meet a requirement of the reporting event. Each analysis is defined as a set of specifications, including:
 * The analysis variable that is the subject of the analysis.
 * The analysis method (set of statistical operations) that is performed for the analysis variable.
 * The analysis set (subject population) for which the analysis is performed.
 * The subset of data records on which the analysis is performed (optional).
 * One or more factors by which either subjects or data records are grouped for analysis (optional).
 */
export interface Analysis extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** An ordinal indicating the version of the identified instance of the class. */
  version?: number;
  /** The rationale for performing this analysis. It indicates when the analysis was planned. */
  reason: ExtensibleTerminologyTerm;
  /** The purpose of the analysis within the body of evidence (e.g., section in the clinical study report). */
  purpose: ExtensibleTerminologyTerm;
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** References to any implementer-defined categories that apply to the analysis. */
  categoryIds?: AnalysisOutputCategoryId[];
  /** The name of the analysis dataset. */
  dataset?: string;
  /** The name of the variable. */
  variable?: string;
  /** The identifier of the referenced analysis set. */
  analysisSetId?: AnalysisSetId;
  /** The identifier of the referenced data subset. */
  dataSubsetId?: DataSubsetId;
  /** An ordered list of grouping factors used in the analysis. */
  orderedGroupings?: OrderedGroupingFactor[];
  /** A reference to the set of one or more statistical operations performed for the analysis. */
  methodId: AnalysisMethodId;
  /** Indications of which analysis contains the results for each referenced operation. */
  referencedAnalysisOperations?: ReferencedAnalysisOperation[];
  /** Programming statements and/or a reference to the program used to perform the specific analysis. */
  programmingCode?: AnalysisOutputProgrammingCode;
  /** The results of the analysis. */
  results?: OperationResult[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isAnalysis(o: object): o is Analysis {
  return "id" in o && "reason" in o && "purpose" in o && "methodId" in o && "name" in o;
}

export function toAnalysis(o: Analysis): Analysis {
  return {
    id: o.id ?? "",
    version: o.version ?? 0,
    reason: o.reason ?? {},
    purpose: o.purpose ?? {},
    documentRefs: o.documentRefs ?? [],
    categoryIds: o.categoryIds ?? [],
    dataset: o.dataset ?? "",
    variable: o.variable ?? "",
    analysisSetId: o.analysisSetId,
    dataSubsetId: o.dataSubsetId,
    orderedGroupings: o.orderedGroupings ?? [],
    methodId: o.methodId,
    referencedAnalysisOperations: o.referencedAnalysisOperations ?? [],
    programmingCode: o.programmingCode,
    results: o.results ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * The rationale for performing this analysis.
 */
export interface AnalysisReason extends ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm: string;
  /** NOT USED */
  sponsorTermId?: SponsorTermId;
}

export function isAnalysisReason(o: object): o is AnalysisReason {
  return "controlledTerm" in o;
}

export function toAnalysisReason(o: AnalysisReason): AnalysisReason {
  return {
    controlledTerm: o.controlledTerm,
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * The sponsor-defined rationale for performing this analysis.
 */
export interface SponsorAnalysisReason extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=AnalysisReasonEnum */
  sponsorTermId: SponsorTermId;
}

export function isSponsorAnalysisReason(o: object): o is SponsorAnalysisReason {
  return "sponsorTermId" in o;
}

export function toSponsorAnalysisReason(o: SponsorAnalysisReason): SponsorAnalysisReason {
  return {
    controlledTerm: o.controlledTerm ?? "",
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * The purpose of the analysis within the body of evidence (e.g., section in the clinical study report).
 */
export interface AnalysisPurpose extends ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm: string;
  /** NOT USED */
  sponsorTermId?: SponsorTermId;
}

export function isAnalysisPurpose(o: object): o is AnalysisPurpose {
  return "controlledTerm" in o;
}

export function toAnalysisPurpose(o: AnalysisPurpose): AnalysisPurpose {
  return {
    controlledTerm: o.controlledTerm,
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * The sponsor-defined purpose of the analysis within the body of evidence (e.g., section in the clinical study report).
 */
export interface SponsorAnalysisPurpose extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=AnalysisPurposeEnum */
  sponsorTermId: SponsorTermId;
}

export function isSponsorAnalysisPurpose(o: object): o is SponsorAnalysisPurpose {
  return "sponsorTermId" in o;
}

export function toSponsorAnalysisPurpose(o: SponsorAnalysisPurpose): SponsorAnalysisPurpose {
  return {
    controlledTerm: o.controlledTerm ?? "",
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * A reference to a defined factor by which subjects or data records are grouped for the analysis, ordered with respect to other grouping factors.
 */
export interface OrderedGroupingFactor {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** The identifier of the referenced subject or data grouping factor. */
  groupingId: GroupingFactorId;
  /** Indicates whether a result is expected for each group in the grouping. */
  resultsByGroup: boolean;
}

export function isOrderedGroupingFactor(o: object): o is OrderedGroupingFactor {
  return "order" in o && "groupingId" in o && "resultsByGroup" in o;
}

export function toOrderedGroupingFactor(o: OrderedGroupingFactor): OrderedGroupingFactor {
  return {
    order: o.order ?? 0,
    groupingId: o.groupingId,
    resultsByGroup: o.resultsByGroup ?? false,
  };
}

/**
 * An indication of the analysis that contains results of a referenced operation.
 */
export interface ReferencedAnalysisOperation {
  /** The identifier of the defined referenced operation relationship. */
  referencedOperationRelationshipId: ReferencedOperationRelationshipId;
  /** The identifier of the referenced analysis. */
  analysisId: AnalysisId;
}

export function isReferencedAnalysisOperation(o: object): o is ReferencedAnalysisOperation {
  return "referencedOperationRelationshipId" in o && "analysisId" in o;
}

export function toReferencedAnalysisOperation(
  o: ReferencedAnalysisOperation,
): ReferencedAnalysisOperation {
  return {
    referencedOperationRelationshipId: o.referencedOperationRelationshipId,
    analysisId: o.analysisId,
  };
}

/**
 * Programming statements and/or a reference to the program used to perform a specific analysis or create a specific output.
 */
export interface AnalysisOutputProgrammingCode {
  /** The name and version of the computer language used for the actual programming statements provided. */
  context: string;
  /** Programming statements used to perform the specific analysis. */
  code?: string;
  /** A reference to the document containing programming code. */
  documentRef?: DocumentReference;
  /** Parameter values used to generate or execute the programming code. */
  parameters?: AnalysisOutputCodeParameter[];
}

export function isAnalysisOutputProgrammingCode(o: object): o is AnalysisOutputProgrammingCode {
  return "context" in o;
}

export function toAnalysisOutputProgrammingCode(
  o: AnalysisOutputProgrammingCode,
): AnalysisOutputProgrammingCode {
  return {
    context: o.context ?? "",
    code: o.code ?? "",
    documentRef: o.documentRef,
    parameters: o.parameters ?? [],
  };
}

/**
 * A parameter whose value is used in programming code for a specific analysis or output.
 */
export interface AnalysisOutputCodeParameter extends CodeParameter {
  /** The value of the parameter. */
  value: string[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isAnalysisOutputCodeParameter(o: object): o is AnalysisOutputCodeParameter {
  return "value" in o && "name" in o;
}

export function toAnalysisOutputCodeParameter(
  o: AnalysisOutputCodeParameter,
): AnalysisOutputCodeParameter {
  return {
    value: o.value ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * The result of an analysis method operation performed on a subdivision of subjects or data records.
 */
export interface OperationResult {
  /** The identifier of the referenced operation. */
  operationId: OperationId;
  /** The group values associated with the result. */
  resultGroups?: ResultGroup[];
  /** The raw result value (e.g., with no rounding applied). */
  rawValue?: string;
  /** The result value formatted for display according to the resultPattern. */
  formattedValue?: string;
}

export function isOperationResult(o: object): o is OperationResult {
  return "operationId" in o;
}

export function toOperationResult(o: OperationResult): OperationResult {
  return {
    operationId: o.operationId,
    resultGroups: o.resultGroups ?? [],
    rawValue: o.rawValue ?? "",
    formattedValue: o.formattedValue ?? "",
  };
}

/**
 * For the specified grouping factor, an indication of the specific group of subjects or data records associated with the analysis result.
 */
export interface ResultGroup {
  /** The identifier of the referenced subject or data grouping factor. */
  groupingId: GroupingFactorId;
  /** The identifier of a referenced predefined group within a grouping. */
  groupId?: GroupId;
  /** The data value used as a group within a data-driven grouping. */
  groupValue?: string;
}

export function isResultGroup(o: object): o is ResultGroup {
  return "groupingId" in o;
}

export function toResultGroup(o: ResultGroup): ResultGroup {
  return {
    groupingId: o.groupingId,
    groupId: o.groupId,
    groupValue: o.groupValue ?? "",
  };
}

/**
 * A global definition for part of a tabular display containing one or more pieces of informational text that may be used in multiple displays.
 */
export interface GlobalDisplaySection {
  /** The type of display section that contains one or more pieces of informational text. */
  sectionType?: string;
  /** A list of defined pieces of information text that may be displayed in display sections of the same type. */
  subSections?: DisplaySubSection[];
}

export function isGlobalDisplaySection(o: object): o is GlobalDisplaySection {
  return "sectionType" in o || "subSections" in o;
}

export function toGlobalDisplaySection(o: GlobalDisplaySection): GlobalDisplaySection {
  return {
    sectionType: o.sectionType,
    subSections: o.subSections ?? [],
  };
}

/**
 * An occurrence of a display section containing text.
 */
export interface DisplaySubSection {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The text to be displayed in the display section. */
  text: string;
}

export function isDisplaySubSection(o: object): o is DisplaySubSection {
  return "id" in o && "text" in o;
}

export function toDisplaySubSection(o: DisplaySubSection): DisplaySubSection {
  return {
    id: o.id ?? "",
    text: o.text ?? "",
  };
}

/**
 * A report of results and their evaluation based on planned analyses performed during the course of a trial.
 */
export interface Output extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** An ordinal indicating the version of the identified instance of the class. */
  version?: number;
  /** Specifications of output files. */
  fileSpecifications?: OutputFile[];
  /** An ordered list of the displays included in the output. */
  displays: OrderedDisplay[];
  /** References to any implementer-defined categories that apply to the output. */
  categoryIds?: AnalysisOutputCategoryId[];
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** Programming statements and/or a reference to the program used to perform the specific output. */
  programmingCode?: AnalysisOutputProgrammingCode;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isOutput(o: object): o is Output {
  return "id" in o && "displays" in o && "name" in o;
}

export function toOutput(o: Output): Output {
  return {
    id: o.id ?? "",
    version: o.version ?? 0,
    fileSpecifications: o.fileSpecifications ?? [],
    displays: o.displays ?? [],
    categoryIds: o.categoryIds ?? [],
    documentRefs: o.documentRefs ?? [],
    programmingCode: o.programmingCode,
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A file containing analysis output displays.
 */
export interface OutputFile extends NamedObject {
  /** The format of the output file. */
  fileType?: ExtensibleTerminologyTerm;
  /** A path (relative or absolute) indicating the location of the file. */
  location?: string;
  /** Reference to the specification of the style used for the output. */
  style?: string;
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isOutputFile(o: object): o is OutputFile {
  return "name" in o;
}

export function toOutputFile(o: OutputFile): OutputFile {
  return {
    fileType: o.fileType ?? {},
    location: o.location,
    style: o.style ?? "",
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * The file format of the file containing output from analyses.
 */
export interface OutputFileType extends ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm: string;
  /** NOT USED */
  sponsorTermId?: SponsorTermId;
}

export function isOutputFileType(o: object): o is OutputFileType {
  return "controlledTerm" in o;
}

export function toOutputFileType(o: OutputFileType): OutputFileType {
  return {
    controlledTerm: o.controlledTerm,
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * The sponsor-defined file format of the file containing output from analyses.
 */
export interface SponsorOutputFileType extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=OutputFileTypeEnum */
  sponsorTermId: SponsorTermId;
}

export function isSponsorOutputFileType(o: object): o is SponsorOutputFileType {
  return "sponsorTermId" in o;
}

export function toSponsorOutputFileType(o: SponsorOutputFileType): SponsorOutputFileType {
  return {
    controlledTerm: o.controlledTerm ?? "",
    sponsorTermId: o.sponsorTermId,
  };
}

/**
 * A display ordered with respect to other displays in an analysis output.
 */
export interface OrderedDisplay {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A display contained in the output. */
  display: OutputDisplay;
}

export function isOrderedDisplay(o: object): o is OrderedDisplay {
  return "order" in o && "display" in o;
}

export function toOrderedDisplay(o: OrderedDisplay): OrderedDisplay {
  return {
    order: o.order ?? 0,
    display: o.display ?? {},
  };
}

/**
 * A tabular representation of the results of one or more analyses.
 */
export interface OutputDisplay extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** An ordinal indicating the version of the identified instance of the class. */
  version?: number;
  /** Display description which uniquely identifies the display in the report. */
  displayTitle?: string;
  /** The parts of the display containing one or more pieces of informational text (e.g. title, footnote). */
  displaySections?: DisplaySection[];
  /** The name for the instance of the class. */
  name: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** A short informative description that may be used for display. */
  label?: string;
}

export function isOutputDisplay(o: object): o is OutputDisplay {
  return "id" in o && "name" in o;
}

export function toOutputDisplay(o: OutputDisplay): OutputDisplay {
  return {
    id: o.id ?? "",
    version: o.version ?? 0,
    displayTitle: o.displayTitle ?? "",
    displaySections: o.displaySections ?? [],
    name: o.name ?? "",
    description: o.description ?? "",
    label: o.label ?? "",
  };
}

/**
 * A part of a tabular display containing one or more pieces of informational text (e.g., title, footnote).
 */
export interface DisplaySection {
  /** The type of display section that contains one or more pieces of informational text. */
  sectionType?: string;
  /** An ordered list of the informational text to display in the display section. */
  orderedSubSections?: OrderedDisplaySubSection[];
}

export function isDisplaySection(o: object): o is DisplaySection {
  return "sectionType" in o || "orderedSubSections" in o;
}

export function toDisplaySection(o: DisplaySection): DisplaySection {
  return {
    sectionType: o.sectionType,
    orderedSubSections: o.orderedSubSections ?? [],
  };
}

/**
 * A single subsection ordered with respect to other subsections in the same section of a display.
 */
export interface OrderedDisplaySubSection {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A defined piece of information text to display in a display section. */
  subSection?: DisplaySubSection;
  /** The identifier of the referenced subsection. */
  subSectionId?: DisplaySubSectionId;
}

export function isOrderedDisplaySubSection(o: object): o is OrderedDisplaySubSection {
  return "order" in o;
}

export function toOrderedDisplaySubSection(o: OrderedDisplaySubSection): OrderedDisplaySubSection {
  return {
    order: o.order ?? 0,
    subSection: o.subSection,
    subSectionId: o.subSectionId,
  };
}

/**
 * A subsection ordered with respect to other subsections of the same type.
 */
export interface OrderedSubSection extends OrderedDisplaySubSection {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A defined piece of information text to display in a display section. */
  subSection: DisplaySubSection;
  /** NOT USED */
  subSectionId?: DisplaySubSectionId;
}

export function isOrderedSubSection(o: object): o is OrderedSubSection {
  return "order" in o && "subSection" in o;
}

export function toOrderedSubSection(o: OrderedSubSection): OrderedSubSection {
  return {
    order: o.order ?? 0,
    subSection: o.subSection ?? {},
    subSectionId: o.subSectionId,
  };
}

/**
 * A reference to a subsection defined either globally or in another display section, ordered with respect to other subsections of the same type.
 */
export interface OrderedSubSectionRef extends OrderedDisplaySubSection {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** NOT USED */
  subSection?: DisplaySubSection;
  /** The identifier of the referenced subsection. */
  subSectionId: DisplaySubSectionId;
}

export function isOrderedSubSectionRef(o: object): o is OrderedSubSectionRef {
  return "order" in o && "subSectionId" in o;
}

export function toOrderedSubSectionRef(o: OrderedSubSectionRef): OrderedSubSectionRef {
  return {
    order: o.order ?? 0,
    subSection: o.subSection,
    subSectionId: o.subSectionId,
  };
}
