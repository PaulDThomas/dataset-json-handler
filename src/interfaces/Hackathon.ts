export type ReportingEventId = string;
export type AnalysisCategorizationId = string;
export type AnalysisCategoryId = string;
export type AnalysisId = string;
export type AnalysisMethodId = string;
export type OperationId = string;
export type ReferencedOperationRelationshipId = string;
export type OutputId = string;
export type OutputDisplayId = string;
export type DisplaySubSectionId = string;
export type AnalysisSetId = string;
export type GroupingFactorId = string;
export type SubjectGroupingFactorId = string;
export type DataGroupingFactorId = string;
export type WhereClauseId = string;
export type GroupId = string;
export type AnalysisGroupId = string;
export type DataGroupId = string;
export type DataSubsetId = string;
export type ReferenceDocumentId = string;
export type TerminologyExtensionId = string;
export type SponsorTermId = string;
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
  Title = "Title",
  Footnote = "Footnote",
  Abbreviation = "Abbreviation",
  Legend = "Legend",
  Rowlabel_Header = "Rowlabel Header",
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
  OperationRoleEnum = "OperationRoleEnum",
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
}
/**
 * A set of analyses and outputs created to meet a specific reporting requirement, such as a CSR or interim analysis.
 */
export interface ReportingEvent extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** An ordinal indicating the version of the identified instance of the class. */
  version?: number;
  /** A structured list of the analyses defined for the reporting event. */
  listOfPlannedAnalyses: NestedList;
  /** An optional structured list of the outputs defined for the reporting event. */
  listOfPlannedOutputs?: NestedList;
  /** The analysis sets (subject populations) defined for the reporting event. */
  analysisSets?: AnalysisSet[];
  /** Characteristics used to subdivide the subject population (e.g., treatment, sex, age group). */
  analysisGroupings?: SubjectGroupingFactor[];
  /** Subsets of data identified by selection criteria for inclusion in analysis definitions. */
  dataSubsets?: DataSubset[];
  /** Characteristics used to subdivide data records in analysis datasets (e.g., visit, system organ class). */
  dataGroupings?: DataGroupingFactor[];
  /** Display section specifications that may be applied to any display. */
  globalDisplaySections?: GlobalDisplaySection[];
  /** Sets of related implementer-defined categories that can be used to categorize analyses or outputs. */
  analysisCategorizations?: AnalysisCategorization[];
  /** The analyses defined for the reporting event. */
  analyses?: Analysis[];
  /** The defined methods used to analyze any analysis variable. */
  methods?: AnalysisMethod[];
  /** The outputs defined for the reporting event. */
  outputs?: Output[];
  /** External documents containing information referenced for the reporting event. */
  referenceDocuments?: ReferenceDocument[];
  /** Any sponsor-defined extensions to extensible terminology. */
  terminologyExtensions?: TerminologyExtension[];
  /** The name for the instance of the class. */
  name: string;
}
/**
 * A list of items (analyses or outputs) that may be organized within sub-lists.
 */
export interface NestedList {
  /** Items in the list. Each item may include a reference to an analysis, a reference to an output, or a sub-list. */
  listItems?: OrderedListItem[];
}
/**
 * An item (analysis, output or sub-list) ordered relative to other items within a list or sub-list.
 */
export interface OrderedListItem extends NamedObject {
  /** The level of the entry within a hierarchical structure. */
  level: number;
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A sub-list of items (analyses or outputs) that may be further organized within sub-lists. */
  sublist?: NestedList;
  /** The identifier of the referenced analysis. */
  analysisId?: AnalysisId;
  /** The identifier of the referenced output. */
  outputId?: OutputId;
  /** The name for the instance of the class. */
  name: string;
}
/**
 * A set of related implementer-defined categories that can be used to categorize analyses or outputs.
 */
export interface AnalysisCategorization {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** Implementer-defined categories of analyses/outputs, each of which may include one or more sub-categorization. */
  categories: AnalysisCategory[];
}
/**
 * An implementer-defined category of analyses/outputs, which may include one or more sub-categorization.
 */
export interface AnalysisCategory {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** Sets of related implementer-defined sub-categories that can be used to categorize analyses or outputs. */
  subCategorizations?: AnalysisCategorization[];
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
  /** References to any implementer-defined categories that apply to the analysis. */
  categoryIds?: AnalysisCategoryId[];
  /** A textual description of the instance of the class. */
  description?: string;
  /** The rationale for performing this analysis. It indicates when the analysis was planned. */
  reason: ExtensibleTerminologyTerm;
  /** The purpose of the analysis within the body of evidence (e.g., section in the clinical study report). */
  purpose: ExtensibleTerminologyTerm;
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** The identifier of the referenced analysis set. */
  analysisSetId?: AnalysisSetId;
  /** An ordered list of grouping factors used in the analysis. */
  orderedGroupings?: OrderedGroupingFactor[];
  /** The identifier of the referenced data subset. */
  dataSubsetId?: DataSubsetId;
  /** The name of the analysis dataset. */
  dataset?: string;
  /** The name of the variable. */
  variable?: string;
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
}
/**
 * A reference to a defined factor by which subjects or data records are grouped for the analysis, ordered with respect to other grouping factors.
 */
export interface OrderedGroupingFactor {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** The identifier of the referenced subject or data grouping factor. */
  groupingId?: GroupingFactorId;
  /** Indicates whether a result is expected for each group in the grouping. */
  resultsByGroup: boolean;
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
/**
 * For the specified grouping factor, an indication of the specific group of subjects or data records associated with the analysis result.
 */
export interface ResultGroup {
  /** The identifier of the referenced subject or data grouping factor. */
  groupingId?: GroupingFactorId;
  /** The identifier of a referenced predefined group within a grouping. */
  groupId?: GroupId;
  /** The data value used as a group within a data-driven grouping. */
  groupValue?: string;
}
/**
 * A set of one or more statistical operations.
 */
export interface AnalysisMethod extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** A textual description of the instance of the class. */
  description?: string;
  /** The calculations performed for the method. Each operation generates a statistical result. */
  operations: Operation[];
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** Template programming statements used to perform the statistical operations for any analysis that uses this method. */
  codeTemplate?: AnalysisProgrammingCodeTemplate;
  /** The name for the instance of the class. */
  name: string;
}
/**
 * A statistical operation that produces a single analysis result value as part of an analysis method.
 */
export interface Operation extends NamedObject {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** Relationships to other operations indicating how the result of the referenced operation are used in the calculation of the result for this operation. */
  referencedOperationRelationships?: ReferencedOperationRelationship[];
  /** The default pattern or format to apply to the result for display. */
  resultPattern?: string;
  /** The name for the instance of the class. */
  name: string;
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
/**
 * A replacement parameter whose value is substituted in template programming code to create statements required for a specific analysis.
 */
export interface CodeParameter extends NamedObject {
  /** A textual description of the instance of the class. */
  description?: string;
  /** The name for the instance of the class. */
  name: string;
}
/**
 * A parameter whose value is used in programming code for a specific analysis or output.
 */
export interface AnalysisOutputCodeParameter extends CodeParameter {
  /** The value of the parameter. */
  value: string[];
  /** A textual description of the instance of the class. */
  description?: string;
  /** The name for the instance of the class. */
  name: string;
}
/**
 * A replacement parameter whose value is substituted in template programming code to create statements required for a specific analysis.
 */
export interface TemplateCodeParameter extends CodeParameter {
  /** A reference to the prespecified source of the value for the parameter. */
  valueSource?: string;
  /** The value to be used for the parameter when the method is used in an analysis. Multiple values may be specified to indicate a choice. */
  value?: string[];
  /** A textual description of the instance of the class. */
  description?: string;
  /** The name for the instance of the class. */
  name: string;
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
  displays?: OrderedDisplay[];
  /** References to any implementer-defined categories that apply to the output. */
  categoryIds?: AnalysisCategoryId[];
  /** References to external documents containing additional information. */
  documentRefs?: DocumentReference[];
  /** Programming statements and/or a reference to the program used to perform the specific output. */
  programmingCode?: AnalysisOutputProgrammingCode;
  /** The name for the instance of the class. */
  name: string;
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
}
/**
 * A display ordered with respect to other displays in an analysis output.
 */
export interface OrderedDisplay {
  /** The ordinal of the instance with respect to other instances. */
  order: number;
  /** A display contained in the output. */
  display?: OutputDisplay;
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
/**
 * An occurrence of a display section containing text.
 */
export interface DisplaySubSection {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The text to be displayed in the display section. */
  text: string;
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
/**
 * Selection criteria defined as either a simple condition ([variable] [comparator] [value(s)]) or a compound expression that may combine simple conditions or compound expressions.
 */
export interface WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: WhereClauseCompoundExpression;
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
/**
 * A compound expression consisting of either two or more where clauses combined with the `AND` or `OR` logical operator, or a single where clause negated with the `NOT` logical operator.
 */
export interface WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: WhereClauseId[];
}
/**
 * A compound expression consisting of either two or more identified analysis sets combined with the `AND` or `OR` logical operator, or a single identified analysis set negated with the `NOT` logical operator.
 */
export interface CompoundSetExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: AnalysisSetId[];
}
/**
 * A compound expression consisting of either two or more identified group combined with the `AND` or `OR` logical operator, or a single identified group negated with the `NOT` logical operator.
 */
export interface CompoundGroupExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: GroupId[];
}
/**
 * A compound expression consisting of either two or more where clauses combined with the `AND` or `OR` logical operator, or a single where clause negated with the `NOT` logical operator.
 */
export interface CompoundSubsetExpression extends WhereClauseCompoundExpression {
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  logicalOperator: string;
  /** A list of one or more where clauses (selection criteria) to be combined or negated. */
  whereClauses?: WhereClauseId[];
}
/**
 * A set of subjects whose data are to be included in the main analyses. This should be defined in the statistical section of the protocol. NOTE: There are a number of potential analysis sets, including, for example, the set based upon the intent-to-treat principle. [ICH E9]
 */
export interface AnalysisSet extends WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundSetExpression;
}
/**
 * A factor used to subdivide either the subject population or data records in an analysis dataset for analysis.
 */
export interface GroupingFactor {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** For groupings based on a single variable, a reference to the dataset variable upon which grouping is based. */
  groupingVariable?: string;
  /** Indicates whether the groups defined by the grouping are prespecified (false) or obtained from distinct data values of the groupingVariable (true). */
  dataDriven: boolean;
  /** The pre-specified groups within the grouping. */
  groups?: Group[];
}
/**
 * A factor used to subdivide the subject population for comparative analysis (e.g., treatment, sex, race, age).
 */
export interface SubjectGroupingFactor extends GroupingFactor {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** For groupings based on a single variable, a reference to the dataset variable upon which grouping is based. */
  groupingVariable?: string;
  /** Indicates whether the groups defined by the grouping are prespecified (false) or obtained from distinct data values of the groupingVariable (true). */
  dataDriven: boolean;
  /** The pre-specified groups within the grouping. */
  groups?: AnalysisGroup[];
}
/**
 * A factor used to subdivide data records in an analysis dataset for analysis.
 */
export interface DataGroupingFactor extends GroupingFactor {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** For groupings based on a single variable, a reference to the dataset variable upon which grouping is based. */
  groupingVariable?: string;
  /** Indicates whether the groups defined by the grouping are prespecified (false) or obtained from distinct data values of the groupingVariable (true). */
  dataDriven: boolean;
  /** The pre-specified groups within the grouping. */
  groups?: DataGroup[];
}
/**
 * A subdivision of the subject population or analysis dataset record set based on a defined factor.
 */
export interface Group extends WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundGroupExpression;
}
/**
 * A subdivision of the subject population based on a defined factor (e.g., subjects whose treatment is Drug A, subjects whose gender is male).
 */
export interface AnalysisGroup extends Group {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundGroupExpression;
}
/**
 * A subdivision of the analysis dataset records based on a defined factor.
 */
export interface DataGroup extends Group {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundGroupExpression;
}
/**
 * A subset of data identified by selection criteria for inclusion in the analysis.
 */
export interface DataSubset extends WhereClause {
  /** The assigned identifying value for the instance of the class. */
  id: string;
  /** A short informative description that may be used for display. */
  label?: string;
  /** The level of the entry within a hierarchical structure. */
  level?: number;
  /** The ordinal of the instance with respect to other instances. */
  order?: number;
  /** A simple selection criterion exressed as [dataset].[variable] [comparator] [value(s)] */
  condition?: WhereClauseCondition;
  /** A compound expression that combines or negates where clauses. */
  compoundExpression?: CompoundSubsetExpression;
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
/**
 * The term used for an attribute whose terminology is extensible.
 */
export interface ExtensibleTerminologyTerm {
  /** One of the permissible values from the referenced enumeration. */
  controlledTerm?: string;
  /** The identifier of the referenced sponsor term. */
  sponsorTermId?: SponsorTermId;
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
/**
 * The sponsor-defined rationale for performing this analysis.
 */
export interface SponsorAnalysisReason extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=AnalysisReasonEnum */
  sponsorTermId: SponsorTermId;
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
/**
 * The sponsor-defined purpose of the analysis within the body of evidence (e.g., section in the clinical study report).
 */
export interface SponsorAnalysisPurpose extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=AnalysisPurposeEnum */
  sponsorTermId: SponsorTermId;
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
/**
 * The sponsor-defined role that the referenced operation's result plays in the calculation of the result of this operation.
 */
export interface SponsorOperationRole extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=OperationRoleEnum */
  sponsorTermId: SponsorTermId;
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
/**
 * The sponsor-defined file format of the file containing output from analyses.
 */
export interface SponsorOutputFileType extends ExtensibleTerminologyTerm {
  /** NOT USED */
  controlledTerm?: string;
  /** A reference to a sponsor term in the TerminologyExtension with enumeration=OutputFileTypeEnum */
  sponsorTermId: SponsorTermId;
}
