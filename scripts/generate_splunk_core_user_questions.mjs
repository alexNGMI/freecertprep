import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/splunk-core-certified-user-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Splunk Basics', target: 38 },
  { name: 'Basic Searching', target: 165 },
  { name: 'Using Fields in Searches', target: 150 },
  { name: 'Search Language Fundamentals', target: 113 },
  { name: 'Using Basic Transforming Commands', target: 112 },
  { name: 'Creating Reports and Dashboards', target: 90 },
  { name: 'Creating and Using Lookups', target: 45 },
  { name: 'Creating Scheduled Reports and Alerts', target: 37 },
]

const CONTEXTS = [
  'during a focused investigation',
  'while validating search behavior',
  'while reviewing operational data',
  'during an analyst handoff',
  'while preparing a reusable search',
  'during a result-quality review',
  'while coaching a junior analyst',
  'during a scheduled health check',
  'while narrowing an event set',
  'during a reporting workflow',
]

const DATASETS = [
  { index: 'web', sourcetype: 'access_combined', field: 'status', value: '500', event: 'HTTP errors' },
  { index: 'security', sourcetype: 'WinEventLog:Security', field: 'EventCode', value: '4625', event: 'failed Windows logons' },
  { index: 'network', sourcetype: 'cisco:asa', field: 'action', value: 'blocked', event: 'firewall denies' },
  { index: 'auth', sourcetype: 'linux_secure', field: 'user', value: 'root', event: 'Linux authentication events' },
  { index: 'sales', sourcetype: 'csv', field: 'region', value: 'west', event: 'regional sales records' },
  { index: 'main', sourcetype: 'syslog', field: 'host', value: 'app01', event: 'system messages' },
]

const DETAILS = [
  'a 15-minute investigation window',
  'a panel backed by a saved search',
  'results handed off by the previous analyst',
  'a search being prepared for reuse',
  'an event set with unrelated matches',
  'a reusable operational view',
  'field filters being checked for accuracy',
  'a weekly operations summary',
  'a failed-authentication review',
  'an HTTP error trend',
  'a firewall deny spike',
  'external business context',
  'an alert threshold under review',
  'a CSV enrichment workflow',
  'a result table intended for a dashboard',
  'a long-running search job',
  'an event list that needs refinement',
  'the fields sidebar and event details',
  'a chart requested by an operations lead',
  'a recurring compliance summary',
  'an app-specific search workspace',
  'a report shared with another team',
  'a scheduled-search readiness check',
]

const HOSTS = ['web01', 'web02', 'auth01', 'fw-edge-01', 'app01', 'db02', 'vpn-gw-01', 'api03']
const WINDOWS = ['Last 15 minutes', 'Last 60 minutes', 'Today', 'Previous week', '-30m@m to now', '-24h@h to @h']
function scenarioFor(domain, id, d, concept = '') {
  const host = HOSTS[id % HOSTS.length]
  const window = WINDOWS[id % WINDOWS.length]
  const count = 5 + ((id * 17) % 991)
  const alternate = DATASETS[(id + 2) % DATASETS.length]
  const key = concept.toLowerCase()

  const fallbacks = {
    'Splunk Basics': [
      `A forwarder on ${host} sends ${d.sourcetype} data to index=${d.index}; users search it from Splunk Web.`,
      `A user can open Search & Reporting and run SPL, but cannot change deployment-wide indexing settings.`,
      `The ${d.event} workflow needs a reusable package containing searches, reports, and dashboards.`,
      `An analyst changes the preferred time zone and default app without altering indexed events.`,
    ],
    'Basic Searching': [
      `The search \`index=${d.index} sourcetype=${d.sourcetype}\` returns ${count} events in ${window}.`,
      `The timeline shows a spike from ${host}, while an all-time search returns unrelated older events.`,
      `A running search for ${d.event} is still scanning data after the useful results have appeared.`,
      `The current result set mixes index=${d.index} with index=${alternate.index} and needs a narrower scope.`,
    ],
    'Using Fields in Searches': [
      `One event contains \`${d.field}=${d.value}\`, \`host=${host}\`, and \`sourcetype=${d.sourcetype}\`.`,
      `The fields sidebar lists ${d.field} in ${count} events and shows ${d.value} as a common value.`,
      `The analyst must keep events where ${d.field} equals ${d.value} before building statistics.`,
      `A field value appears as \`${d.value} access denied\` and must be treated as one phrase.`,
    ],
    'Search Language Fundamentals': [
      `The current pipeline is \`index=${d.index} sourcetype=${d.sourcetype} | table _time host ${d.field}\`.`,
      `The result table contains repeated values for host=${host} and must be shaped without changing raw data.`,
      `A report needs readable columns for \`host\`, \`${d.field}\`, and \`_time\`.`,
      `The base search selects ${count} ${d.event} events before later commands format the results.`,
    ],
    'Using Basic Transforming Commands': [
      `The analyst needs a result table that summarizes ${count} events by ${d.field}.`,
      `Values of ${d.field} must be ranked to reveal the most or least common values.`,
      `The search \`index=${d.index} sourcetype=${d.sourcetype}\` must produce counts grouped by ${d.field}.`,
      `Raw ${d.event} events need to become chart-ready statistics for ${window}.`,
    ],
    'Creating Reports and Dashboards': [
      `A validated search for ${d.event} produces a table of \`${d.field}\` and \`count\` for ${window}.`,
      `An operations page needs separate panels for ${d.event}, host health, and event volume.`,
      `A saved search is useful to several analysts and should retain its title, permissions, and visualization.`,
      `A panel backed by \`stats count by ${d.field}\` needs a clearer chart without re-indexing data.`,
    ],
    'Creating and Using Lookups': [
      `Events contain \`${d.field}=${d.value}\`; a CSV contains \`${d.field},owner,priority\`.`,
      `The lookup has ${count} rows, but no enrichment appears for ${d.field}=${d.value}.`,
      `A lookup definition named \`${d.index}_asset_context\` points to a CSV keyed by ${d.field}.`,
      `Search results need owner and priority added without changing the original ${d.event} events.`,
    ],
    'Creating Scheduled Reports and Alerts': [
      `A saved search returns ${count} ${d.event} events in ${window}; the team only needs action above 40 results.`,
      `A compliance search must run every Monday and preserve its results for review.`,
      `An alert for ${d.field}=${d.value} fires every five minutes even when only one event is present.`,
      `The search is validated; the remaining decisions are schedule, trigger condition, and notification action.`,
    ],
  }

  let evidence

  if (key === 'indexer') evidence = `A forwarder on ${host} sends ${d.sourcetype} data to index=${d.index}, where the events are stored and made searchable.`
  else if (key === 'search head') evidence = `A user opens Splunk Web on the search tier, enters SPL, and receives results from index=${d.index}.`
  else if (key.includes('app packages')) evidence = `A security workspace must distribute related searches, reports, dashboards, and navigation as one unit.`
  else if (key.includes('user preferences')) evidence = `An analyst needs a different time zone and default app without changing roles, source types, or indexed data.`
  else if (key.includes('search, analyze, monitor')) evidence = `The team wants to investigate ${d.event}, summarize trends, and present the findings in a dashboard.`
  else if (key.includes('search & reporting')) evidence = `A new user has access to Splunk Web and needs the standard workspace for an ad hoc SPL search.`
  else if (key.startsWith('index=')) evidence = `The current all-index search mixes ${d.event} with data from index=${alternate.index}; the required events use sourcetype=${d.sourcetype} and ${d.field}=${d.value}.`
  else if (key.includes('time picker') || key.includes('earliest/latest')) evidence = `An all-time search returns older events, but the investigation only covers ${window}.`
  else if (key.includes('events list')) evidence = `The Search view shows raw matching records with _time, host=${host}, and extracted field ${d.field}.`
  else if (key.includes('more specific search terms')) evidence = `A broad search returns ${count} events from both index=${d.index} and index=${alternate.index}, including unrelated source types.`
  else if (key.includes('timeline helps')) evidence = `The event histogram contains a sharp spike from host=${host} within ${window}.`
  else if (key.includes('pause, resume, finalize')) evidence = `A long-running search is still scanning events after the analyst has enough evidence to stop or inspect the job.`
  else if (key.includes('save the search as a report')) evidence = `A validated search for ${d.event} must be reused by the same team next week.`
  else if (key.includes('search mode affects')) evidence = `The analyst compares Fast, Smart, and Verbose modes while deciding how much field discovery is needed.`
  else if (key.includes('name-value pairs')) evidence = `One event contains host=${host}, sourcetype=${d.sourcetype}, and ${d.field}=${d.value}.`
  else if (key === `${d.field.toLowerCase()}=${d.value.toLowerCase()}`) evidence = `The analyst must keep only events whose ${d.field} value is ${d.value}.`
  else if (key.includes('fields sidebar')) evidence = `The Search view lists ${d.field} as an interesting field and displays its common values.`
  else if (key.includes('selected fields are shown')) evidence = `The event view displays _time, host, and ${d.field} above the remaining discovered fields.`
  else if (key.includes('quotation marks')) evidence = `The required ${d.field} value contains multiple words that must be matched as one phrase.`
  else if (key.includes('fields can be used to filter')) evidence = `Only ${d.field}=${d.value} events should reach the later stats command.`
  else if (key.includes('pipe character')) evidence = `The SPL starts with \`index=${d.index}\` and then sends those events to \`table _time host ${d.field}\`.`
  else if (key.includes('specify index early')) evidence = `The relevant data is known to reside in index=${d.index}, while other indexes contain unrelated events.`
  else if (key.startsWith('table keeps')) evidence = `The final output needs columns for _time, host, and ${d.field}.`
  else if (key.startsWith('rename changes')) evidence = `A report should display a readable label instead of the field name ${d.field}.`
  else if (key.startsWith('fields can include')) evidence = `The current results contain dozens of fields, but the next command only needs host and ${d.field}.`
  else if (key.startsWith('dedup keeps')) evidence = `The result set contains repeated events for host=${host}, and only one representative event per host is needed.`
  else if (key.startsWith('sort orders')) evidence = `A table of ${d.field} and count must place the largest count first.`
  else if (key === 'stats') evidence = `The analyst needs count and average calculations grouped by ${d.field}.`
  else if (key === 'top') evidence = `The analyst needs the most frequent ${d.field} values with counts and percentages.`
  else if (key === 'rare') evidence = `The analyst needs the least frequent ${d.field} values to identify unusual activity.`
  else if (key.includes('| stats count by')) evidence = `The search for ${d.event} must become a result table of event counts grouped by ${d.field}.`
  else if (key.includes('transforming commands create')) evidence = `Raw ${d.event} events must become a chart-ready aggregate table.`
  else if (key === 'save the search as a report') evidence = `A tested search needs a reusable title, permissions, schedule, and visualization settings.`
  else if (key.includes('reports can display')) evidence = `The search returns a statistical table with ${d.field} and count columns.`
  else if (key.includes('dashboard organizes')) evidence = `An operations page must present related panels for ${d.event}, host health, and volume.`
  else if (key.includes('add a saved report')) evidence = `A validated saved report must appear alongside other monitoring panels.`
  else if (key.includes('edit the report definition')) evidence = `A chart needs a clearer title and visualization type, but its indexed source data is already correct.`
  else if (key.includes('lookups enrich')) evidence = `Events contain ${d.field}=${d.value}; a CSV maps that key to owner, department, and priority.`
  else if (key.includes('lookup definition tells')) evidence = `A CSV has been uploaded, but searches still need a named configuration that describes how to use it.`
  else if (key.includes('use a lookup keyed')) evidence = `The event field ${d.field} matches a CSV key that can return owner and severity.`
  else if (key.includes('usable key field')) evidence = `A lookup returns no enrichment for ${d.field}=${d.value}, even though both the events and CSV should share that key.`
  else if (key.includes('scheduled report runs')) evidence = `A compliance search must execute automatically every Monday without a user opening Splunk Web.`
  else if (key.startsWith('an alert is used')) evidence = `The team needs a notification only when a search for ${d.event} crosses an operational threshold.`
  else if (key.includes('scheduled alerts evaluate')) evidence = `A saved search should run every five minutes and test its result count even when no dashboard is open.`
  else if (key.includes('choose an alert condition')) evidence = `The current alert fires for every result, but action is only warranted when more than 40 events occur in ${window}.`
  else evidence = fallbacks[domain][id % fallbacks[domain].length]

  return `${evidence} The search window is ${window}, and the current result set contains ${count} events.`
}

function reviewGuidance(domain, d) {
  const guidance = {
    'Splunk Basics': 'Choose the component or user feature that owns the described responsibility; interface objects do not perform indexing.',
    'Basic Searching': `Start with time, index=${d.index}, and sourcetype=${d.sourcetype} constraints before adding presentation commands.`,
    'Using Fields in Searches': `Treat ${d.field} as a searchable name-value pair and verify that its value exists in the current result set.`,
    'Search Language Fundamentals': 'Base terms select events; commands after a pipe shape, filter, order, or display the resulting data.',
    'Using Basic Transforming Commands': 'Use transforming commands when the required output is an aggregate or ranked table rather than raw events.',
    'Creating Reports and Dashboards': 'Validate the underlying search first, then save and present it without implying that the raw indexed data changes.',
    'Creating and Using Lookups': `Successful enrichment requires a matching key such as ${d.field} and explicitly returned lookup fields.`,
    'Creating Scheduled Reports and Alerts': 'A reliable scheduled object combines a tested search, an appropriate time window, and a meaningful schedule or trigger.',
  }
  return guidance[domain]
}

const BANK = {
  'Splunk Basics': [
    {
      correct: 'Indexer',
      distractors: ['Lookup editor', 'Dashboard panel', 'Time picker'],
      stem: ({ context }) => `An analyst asks which Splunk component stores indexed data and processes many search requests ${context}. Which component is the best answer?`,
      explanation: 'The indexer parses and stores incoming data in indexes and participates in searches over that data. Search heads coordinate user searches, while dashboards and time pickers are interface features rather than indexing components.',
    },
    {
      correct: 'Search head',
      distractors: ['Forwarder', 'Index bucket', 'Lookup file'],
      stem: ({ context }) => `A user opens Splunk Web, enters SPL, and views results ${context}. Which component provides the primary search interface?`,
      explanation: 'A search head gives users the search interface and coordinates searches across indexed data. Forwarders collect and send data, index buckets store indexed data, and lookup files enrich events.',
    },
    {
      correct: 'A Splunk app packages knowledge objects, dashboards, views, and configuration for a purpose or audience',
      distractors: ['An app is only a raw data file uploaded to an index', 'An app is the same thing as one scheduled alert', 'An app is only a browser bookmark for a search'],
      stem: ({ context }) => `A team installs a Splunk app for security monitoring ${context}. What does a Splunk app generally provide?`,
      explanation: 'Splunk apps organize related knowledge objects, dashboards, reports, views, and configuration. They are not simply one alert, one data file, or a browser shortcut.',
    },
    {
      correct: 'User preferences can control display settings such as time zone and default app',
      distractors: ['User preferences rebuild indexed buckets', 'User preferences change every source type extraction globally', 'User preferences replace role-based permissions'],
      stem: ({ context }) => `A learner is reviewing customization options ${context}. Which statement about Splunk user settings is accurate?`,
      explanation: 'User settings can personalize display behavior such as time zone, language, and default app depending on deployment settings. They do not rebuild indexes or replace security roles.',
    },
    {
      correct: 'Splunk is commonly used to search, analyze, monitor, and visualize machine data',
      distractors: ['Splunk is used only to draw network cabling diagrams', 'Splunk is only a packet capture appliance', 'Splunk replaces all endpoint operating systems'],
      stem: ({ context }) => `A manager asks what Splunk is used for ${context}. Which answer best matches Splunk Core User scope?`,
      explanation: 'Splunk helps users search, analyze, monitor, report on, and visualize machine data from many sources. It is not limited to packet capture, cabling diagrams, or endpoint operating systems.',
    },
    {
      correct: 'The Search & Reporting app is a common starting point for ad hoc searches',
      distractors: ['The license page is the primary place to run SPL', 'The audit index editor is required for every search', 'The browser cache is where SPL searches run'],
      stem: ({ context }) => `A new analyst needs to run an ad hoc SPL search ${context}. Where would they commonly start in Splunk Web?`,
      explanation: 'The Search & Reporting app is the common user-facing place to run searches, inspect events, and build reports. Administrative pages and browser cache are not the normal search workspace.',
    },
  ],
  'Basic Searching': [
    {
      correct: ({ d }) => `index=${d.index} sourcetype=${d.sourcetype} ${d.field}=${d.value}`,
      distractors: ({ d }) => [`${d.field}=${d.value}`, `sourcetype=* ${d.value}`, `index=* ${d.field}=*`],
      stem: ({ d, context }) => `An analyst wants the most efficient basic search for ${d.event} ${context}. Which search best narrows by index, sourcetype, and field value?`,
      explanation: ({ d }) => `A targeted search such as index=${d.index} sourcetype=${d.sourcetype} ${d.field}=${d.value} limits the data Splunk must scan and keeps the intent clear. Searches that omit index or sourcetype are broader and usually less efficient.`,
    },
    {
      correct: 'Use the time picker or earliest/latest modifiers to limit the search window',
      distractors: ['Add fields * to the beginning of every search', 'Use rename before the base search terms', 'Save the search before choosing a time range'],
      stem: ({ context }) => `A user gets too many historical events ${context}. What is the best way to restrict the search to the desired time period?`,
      explanation: 'Splunk searches are strongly affected by time range. The time picker or earliest/latest modifiers limit the events scanned and returned, which improves relevance and performance.',
    },
    {
      correct: 'The events list shows matching raw events and selected fields from the search results',
      distractors: ['The events list only displays dashboard permissions', 'The events list changes the license volume setting', 'The events list stores lookup definitions'],
      stem: ({ context }) => `A learner opens search results and reviews the event area ${context}. What does the events list represent?`,
      explanation: 'The events list contains raw matching events and extracted or selected fields from the current search. It does not manage licensing, dashboards, or lookup definitions.',
    },
    {
      correct: 'Use more specific search terms, fields, indexes, source types, or time ranges',
      distractors: ['Remove the time range to include all data', 'Replace the search with only an asterisk', 'Use table before any search terms are entered'],
      stem: ({ context }) => `A search returns too much unrelated data ${context}. Which approach best refines it?`,
      explanation: 'Refining a search means narrowing it with relevant terms, fields, index and sourcetype constraints, and a useful time range. Broadening the search usually makes the problem worse.',
    },
    {
      correct: 'The timeline helps identify event distribution over time and select dense or interesting periods',
      distractors: ['The timeline creates lookup files automatically', 'The timeline permanently deletes old events', 'The timeline replaces field extraction settings'],
      stem: ({ context }) => `A spike appears in search results ${context}. How does the timeline help?`,
      explanation: 'The timeline visualizes event counts across the selected time range. It helps users spot spikes, gaps, and periods worth drilling into.',
    },
    {
      correct: 'Pause, resume, finalize, or inspect the search job from job controls',
      distractors: ['Change the index bucket size from the event table', 'Convert the job into a data model by default', 'Disable source types from the timeline'],
      stem: ({ context }) => `A long-running search needs to be controlled ${context}. Which action belongs to search job controls?`,
      explanation: 'Splunk lets users manage search jobs with actions such as pause, resume, finalize, and inspect depending on permissions and job state. These are job controls, not data model or source type administration.',
    },
    {
      correct: 'Save the search as a report when it should be reused or shared as a knowledge object',
      distractors: ['Copy one event into the browser address bar', 'Change the role name to match the search text', 'Use dedup to create a scheduled report automatically'],
      stem: ({ context }) => `A useful search needs to be reused later ${context}. What is the best Splunk action?`,
      explanation: 'Saving a search as a report makes it reusable and manageable as a knowledge object. It can later be shared, scheduled, or added to a dashboard depending on permissions.',
    },
    {
      correct: 'Search mode affects how much field discovery and result processing Splunk performs while searching',
      distractors: ['Search mode changes the raw events before indexing', 'Search mode is only a dashboard color setting', 'Search mode permanently edits source types'],
      stem: ({ context }) => `A learner compares Fast, Smart, and Verbose search modes ${context}. What is the key idea?`,
      explanation: 'Search modes influence result detail and field discovery during a search. They affect the search experience and processing behavior, not the original indexed events.',
    },
  ],
  'Using Fields in Searches': [
    {
      correct: 'Fields are searchable name-value pairs extracted from events',
      distractors: ['Fields are always separate indexes', 'Fields are dashboard-only color settings', 'Fields are raw log files stored outside Splunk'],
      stem: ({ context }) => `A learner asks what a field is in Splunk ${context}. Which answer is most accurate?`,
      explanation: 'Fields are name-value pairs extracted from event data, such as host, source, sourcetype, status, or user. They make searches, filters, statistics, and reports more precise.',
    },
    {
      correct: ({ d }) => `${d.field}=${d.value}`,
      distractors: ({ d }) => [`${d.field} | ${d.value}`, `field(${d.value})`, `rename ${d.field} as ${d.value}`],
      stem: ({ d, context }) => `An analyst wants to filter events where ${d.field} equals ${d.value} ${context}. Which field expression is correct?`,
      explanation: ({ d }) => `The expression ${d.field}=${d.value} filters events to those with that field value. Pipe commands such as rename are used after matching events, not as the basic equality expression.`,
    },
    {
      correct: 'The fields sidebar helps users inspect available fields and quickly add field filters',
      distractors: ['The fields sidebar creates indexes automatically', 'The fields sidebar changes all user role permissions', 'The fields sidebar is only available after exporting results'],
      stem: ({ context }) => `A user clicks values in the fields sidebar ${context}. What is the sidebar mainly used for?`,
      explanation: 'The fields sidebar shows selected and interesting fields for the current results and supports fast filtering. It helps analysts understand and narrow event data.',
    },
    {
      correct: 'Selected fields are shown prominently because Splunk or the user has chosen them for the result view',
      distractors: ['Selected fields are encrypted indexes', 'Selected fields are always lookup file names', 'Selected fields are deleted from events after search'],
      stem: ({ context }) => `A learner sees selected fields above interesting fields ${context}. What does selected fields mean?`,
      explanation: 'Selected fields are displayed prominently in the search interface, either by default or because the user selected them. This affects display and analysis, not the existence of the data.',
    },
    {
      correct: 'Use quotation marks when matching a field value that contains spaces',
      distractors: ['Remove the field name whenever a value has spaces', 'Use table before every quoted string', 'Use dedup instead of quotes for phrase values'],
      stem: ({ context }) => `A field value contains a phrase such as "Access Denied" ${context}. What search practice is appropriate?`,
      explanation: 'Values or phrases containing spaces should be quoted so Splunk treats the phrase as a value rather than separate terms. This keeps the field filter precise.',
    },
    {
      correct: 'Fields can be used to filter before transforming commands such as stats',
      distractors: ['Fields only work after a dashboard is saved', 'Fields cannot be used in reports', 'Fields are ignored by transforming commands'],
      stem: ({ context }) => `A report should count only specific events ${context}. How should fields be used?`,
      explanation: 'Fields can narrow events before transforming commands and can also group or aggregate results. Effective field filtering is a core Splunk search skill.',
    },
  ],
  'Search Language Fundamentals': [
    {
      correct: 'The pipe character sends the results of one command into the next command',
      distractors: ['The pipe character deletes all prior results', 'The pipe character changes the selected app', 'The pipe character starts a new index bucket'],
      stem: ({ context }) => `A learner reviews SPL command chaining ${context}. What does the pipe character do?`,
      explanation: 'In SPL, the pipe passes current search results to the next command in the pipeline. This lets users search, filter, transform, sort, rename, and format results step by step.',
    },
    {
      correct: 'Specify index early in the search to limit where Splunk looks for events',
      distractors: ['Place index after table so formatting runs first', 'Never specify index in a basic user search', 'Use index only after the search has been saved'],
      stem: ({ context }) => `A search should target a known data store ${context}. Why include index=... near the base search?`,
      explanation: 'Specifying the index early narrows the search scope and can improve performance and clarity. Formatting commands such as table should usually happen after the event set is selected.',
    },
    {
      correct: 'table keeps and displays fields in a tabular result set',
      distractors: ['table removes duplicate events by one field', 'table changes field names permanently', 'table sorts events by time descending only'],
      stem: ({ context }) => `A user wants columns for user, host, and status ${context}. Which command is designed to display selected fields as a table?`,
      explanation: 'The table command formats results with specified fields as columns. It is useful for reports and clear result display after the search has found the right events.',
    },
    {
      correct: 'rename changes the display name of a field in the search results',
      distractors: ['rename deletes indexed raw data', 'rename creates a scheduled alert', 'rename adds a new index to the search path'],
      stem: ({ context }) => `A report should show "Client IP" instead of clientip ${context}. Which command is appropriate?`,
      explanation: 'The rename command changes field names in the result set, often to make reports easier to read. It does not modify indexed raw events.',
    },
    {
      correct: 'fields can include or exclude fields from the result set',
      distractors: ['fields calculates top values automatically', 'fields sends data to a forwarder', 'fields creates dashboard panels by itself'],
      stem: ({ context }) => `A user wants fewer fields in the output ${context}. What does the fields command do?`,
      explanation: 'The fields command controls which fields are kept or removed from results. It helps simplify output and can reduce later processing load.',
    },
    {
      correct: 'dedup keeps one event per unique value or value combination',
      distractors: ['dedup calculates averages by field', 'dedup renames fields for dashboards', 'dedup creates lookup definitions'],
      stem: ({ context }) => `A search has many repeated hosts and the analyst wants one event per host ${context}. Which command fits?`,
      explanation: 'The dedup command removes duplicate results based on one or more fields, keeping representative events. It is different from stats, rename, or lookup creation.',
    },
    {
      correct: 'sort orders search results by one or more fields',
      distractors: ['sort creates a new source type', 'sort hides the timeline permanently', 'sort uploads a CSV lookup file'],
      stem: ({ context }) => `A report should show the highest counts first ${context}. Which command orders the rows?`,
      explanation: 'The sort command orders results by fields and can sort ascending or descending. It changes result order, not source type definitions.',
    },
  ],
  'Using Basic Transforming Commands': [
    {
      correct: 'stats',
      distractors: ['fields', 'rename', 'dedup'],
      stem: ({ context }) => `An analyst needs counts and averages grouped by host ${context}. Which command calculates statistics over events?`,
      explanation: 'The stats command aggregates events into statistical results such as count, avg, sum, min, and max, often grouped with by clauses.',
    },
    {
      correct: 'top',
      distractors: ['rename', 'fields', 'table'],
      stem: ({ context }) => `A user wants the most common values of a field with counts and percentages ${context}. Which command is best?`,
      explanation: 'The top command returns the most frequent values for a field and includes counts and percentages by default. It is a transforming command.',
    },
    {
      correct: 'rare',
      distractors: ['dedup', 'sort', 'table'],
      stem: ({ context }) => `A user wants the least common values of a field ${context}. Which command is best?`,
      explanation: 'The rare command returns the least common values for a field. It is useful when unusual values may indicate outliers or anomalies.',
    },
    {
      correct: ({ d }) => `index=${d.index} sourcetype=${d.sourcetype} | stats count by ${d.field}`,
      distractors: ({ d }) => [
        `index=${d.index} sourcetype=${d.sourcetype} | rename count as ${d.field}`,
        `index=${d.index} sourcetype=${d.sourcetype} | fields count by ${d.field}`,
        `index=${d.index} sourcetype=${d.sourcetype} | dedup count by ${d.field}`,
      ],
      stem: ({ d, context }) => `A report needs event counts grouped by ${d.field} ${context}. Which SPL is correct?`,
      explanation: ({ d }) => `stats count by ${d.field} transforms matching events into grouped counts. rename, fields, and dedup do not calculate grouped statistics.`,
    },
    {
      correct: 'Transforming commands create statistical or tabular results rather than returning only raw events',
      distractors: ['Transforming commands can only run before the base search', 'Transforming commands are used only to edit user roles', 'Transforming commands permanently rewrite source logs'],
      stem: ({ context }) => `A learner asks why stats, top, and rare are called transforming commands ${context}. Which answer is best?`,
      explanation: 'Transforming commands convert events into result tables or statistics, which are often used for reports and dashboards. They do not rewrite the original log data.',
    },
  ],
  'Creating Reports and Dashboards': [
    {
      correct: 'Save the search as a report',
      distractors: ['Delete the source type', 'Change the app icon', 'Rename the index bucket'],
      stem: ({ context }) => `A recurring query should be reused and shared with a team ${context}. What should the user do first?`,
      explanation: 'Saving a search as a report creates a reusable knowledge object. Reports can then be edited, scheduled, shared, or placed on dashboards depending on permissions.',
    },
    {
      correct: 'Reports can display statistical tables or visualizations when the search returns suitable results',
      distractors: ['Reports can only show raw event text', 'Reports cannot use transforming commands', 'Reports require a lookup before they can be saved'],
      stem: ({ context }) => `A report uses stats count by status ${context}. What output options are realistic?`,
      explanation: 'Reports commonly display tables, charts, or other visualizations when the SPL produces structured results. Transforming commands often make report visualization easier.',
    },
    {
      correct: 'A dashboard organizes one or more panels so users can monitor related searches and visualizations',
      distractors: ['A dashboard is the same as an indexer cluster', 'A dashboard is only a field extraction rule', 'A dashboard permanently changes every event timestamp'],
      stem: ({ context }) => `A manager wants one page with several operational charts ${context}. What Splunk object fits?`,
      explanation: 'Dashboards collect panels and visualizations into a shared view for monitoring or analysis. They present search-driven results rather than changing indexed data.',
    },
    {
      correct: 'Add a saved report or panel to a dashboard',
      distractors: ['Move the report into the license manager', 'Convert the report into a source type', 'Disable the time picker globally'],
      stem: ({ context }) => `A useful report should appear on an existing dashboard ${context}. What is the appropriate action?`,
      explanation: 'Splunk lets users add reports or search-driven panels to dashboards so the output is visible in a broader monitoring view.',
    },
    {
      correct: 'Edit the report definition or visualization settings without changing indexed raw data',
      distractors: ['Re-index all historical events for every label change', 'Delete all scheduled alerts first', 'Disable field discovery for the whole deployment'],
      stem: ({ context }) => `A report title and chart type need cleanup ${context}. What kind of edit is normally involved?`,
      explanation: 'Report and visualization edits update knowledge-object presentation and search configuration. They do not require rewriting raw indexed data.',
    },
  ],
  'Creating and Using Lookups': [
    {
      correct: 'Lookups enrich events by adding fields from an external table or defined lookup source',
      distractors: ['Lookups erase raw event text after a search', 'Lookups replace the time picker', 'Lookups are only dashboard color palettes'],
      stem: ({ context }) => `A CSV maps user IDs to departments ${context}. Why would a Splunk user create a lookup?`,
      explanation: 'Lookups add context to events by matching event fields to rows in a lookup source and returning additional fields. They are commonly used for enrichment.',
    },
    {
      correct: 'A lookup definition tells Splunk how to use the lookup file or lookup source in searches',
      distractors: ['A lookup definition is the same as an index bucket', 'A lookup definition is only a saved dashboard title', 'A lookup definition controls physical disk RAID'],
      stem: ({ context }) => `A CSV lookup file has been uploaded ${context}. What is the purpose of the lookup definition?`,
      explanation: 'A lookup definition configures how Splunk refers to and uses the lookup source. Users can then call the lookup from SPL or configure automatic lookups where appropriate.',
    },
    {
      correct: ({ d }) => `Use a lookup keyed on ${d.field} to add descriptive fields such as owner, department, or severity`,
      distractors: ({ d }) => [`Use rename ${d.field} as owner to import all lookup rows`, 'Use sort to upload the CSV file', 'Use top to create the lookup definition automatically'],
      stem: ({ d, context }) => `A team wants to enrich events that contain ${d.field} ${context}. Which lookup use is most appropriate?`,
      explanation: ({ d }) => `A lookup can match an event field such as ${d.field} to an external table and add related fields. Commands like rename, sort, and top do not import or define lookup enrichment by themselves.`,
    },
    {
      correct: 'The lookup file needs a usable key field that matches a field in the events',
      distractors: ['The lookup file must always be empty before use', 'The lookup file must be stored inside every raw event', 'The lookup file can only contain one column named time'],
      stem: ({ context }) => `A lookup is not returning expected enrichment ${context}. What basic design requirement should be checked?`,
      explanation: 'Lookup matching depends on a common key between events and lookup rows. If the key field names or values do not align, enrichment will fail or be incomplete.',
    },
  ],
  'Creating Scheduled Reports and Alerts': [
    {
      correct: 'A scheduled report runs a saved search on a defined schedule',
      distractors: ['A scheduled report only changes the user time zone', 'A scheduled report deletes old lookup rows', 'A scheduled report replaces event indexing'],
      stem: ({ context }) => `A weekly compliance report should run automatically ${context}. What does scheduling a report do?`,
      explanation: 'A scheduled report executes a saved search at configured times. It helps automate recurring reporting without requiring a user to run the search manually each time.',
    },
    {
      correct: 'An alert is used when search results meet a defined condition that should trigger an action or notification',
      distractors: ['An alert is only a dashboard color theme', 'An alert is a raw data source type', 'An alert is required before every ad hoc search'],
      stem: ({ context }) => `A team wants notification when failed logons exceed a threshold ${context}. Which Splunk feature fits?`,
      explanation: 'Alerts monitor search results for defined conditions and can trigger actions such as notifications. They are appropriate when a result should prompt attention.',
    },
    {
      correct: 'Scheduled alerts evaluate results at intervals and trigger when the configured condition is met',
      distractors: ['Scheduled alerts only run when a user opens the dashboard', 'Scheduled alerts require raw events to be manually pasted into Splunk', 'Scheduled alerts permanently disable the search head'],
      stem: ({ context }) => `A learner reviews scheduled alert behavior ${context}. Which statement is accurate?`,
      explanation: 'Scheduled alerts run searches on a schedule and evaluate trigger conditions. They do not require a dashboard view to be open at the moment they run.',
    },
    {
      correct: 'Choose an alert condition that matches the operational risk, such as result count greater than a threshold',
      distractors: ['Trigger every alert for every event regardless of severity', 'Use only the dashboard title as the trigger condition', 'Avoid time windows because alerts do not use time'],
      stem: ({ context }) => `A noisy alert fires too often ${context}. What should be reviewed first?`,
      explanation: 'Alert quality depends on a meaningful search, time window, and trigger condition. Thresholds and result conditions should reflect the risk the team actually wants to catch.',
    },
  ],
}

const MATCH_SETS = {
  'Splunk Basics': {
    question: 'Match each Splunk concept to its primary user-level meaning.',
    left: ['Indexer', 'Search head', 'Forwarder', 'Splunk app'],
    right: ['Stores indexed data and helps process searches', 'Provides the search interface and coordinates searches', 'Collects or sends data toward Splunk indexing', 'Packages related views, dashboards, and knowledge objects'],
    matches: [0, 1, 2, 3],
    explanation: 'Core Splunk architecture separates data collection, indexing, search coordination, and packaged app content. Core User candidates should recognize these user-facing roles.',
  },
  'Basic Searching': {
    question: 'Match each search interface element to what it helps a user do.',
    left: ['Time picker', 'Timeline', 'Events list', 'Job controls'],
    right: ['Limit the time window for the search', 'See event distribution across time', 'Inspect matching raw events and fields', 'Pause, resume, finalize, or inspect a search'],
    matches: [0, 1, 2, 3],
    explanation: 'Basic searching requires understanding both SPL and the Search UI: time range, timeline, events, and job controls all shape how users explore results.',
  },
  'Using Fields in Searches': {
    question: 'Match each field-related concept to its best description.',
    left: ['Field', 'Selected fields', 'Fields sidebar', 'Quoted field value'],
    right: ['A searchable name-value pair extracted from an event', 'Fields shown prominently in the event view', 'UI area for inspecting and filtering available fields', 'A phrase value matched as one value'],
    matches: [0, 1, 2, 3],
    explanation: 'Fields are central to Splunk searches. The field sidebar and selected-field display help analysts understand and refine the current result set.',
  },
  'Search Language Fundamentals': {
    question: 'Match each SPL command to its basic purpose.',
    left: ['table', 'rename', 'fields', 'dedup', 'sort'],
    right: ['Display selected fields as columns', 'Change field names in the results', 'Keep or remove fields from results', 'Keep one result per unique field value', 'Order results by field values'],
    matches: [0, 1, 2, 3, 4],
    explanation: 'These SPL fundamentals shape and format results after the base search has selected the relevant events.',
  },
  'Using Basic Transforming Commands': {
    question: 'Match each transforming command to the result it is designed to produce.',
    left: ['stats', 'top', 'rare'],
    right: ['Calculated aggregations such as count or average', 'Most common field values', 'Least common field values'],
    matches: [0, 1, 2],
    explanation: 'stats, top, and rare transform raw events into statistical or ranked result tables for analysis and reporting.',
  },
  'Creating Reports and Dashboards': {
    question: 'Match each reporting object to its common use.',
    left: ['Report', 'Dashboard', 'Panel', 'Visualization'],
    right: ['Reusable saved search output', 'Page containing related panels', 'Dashboard element backed by a search or report', 'Chart or visual display of structured results'],
    matches: [0, 1, 2, 3],
    explanation: 'Reports and dashboards turn searches into reusable operational views. Panels and visualizations are dashboard building blocks.',
  },
  'Creating and Using Lookups': {
    question: 'Match each lookup term to its purpose.',
    left: ['Lookup file', 'Lookup definition', 'Lookup key', 'Enrichment field'],
    right: ['External table such as a CSV', 'Configuration that tells Splunk how to use the lookup', 'Field used to match events to lookup rows', 'Field added to events from the lookup'],
    matches: [0, 1, 2, 3],
    explanation: 'Lookup success depends on a usable table, a configured definition, a matching key, and useful enrichment fields returned into search results.',
  },
  'Creating Scheduled Reports and Alerts': {
    question: 'Match each scheduled-search concept to its meaning.',
    left: ['Scheduled report', 'Alert', 'Trigger condition', 'Notification action'],
    right: ['Saved search that runs on a timetable', 'Search-based monitor for a condition', 'Rule that decides when an alert fires', 'Action such as sending an email or message'],
    matches: [0, 1, 2, 3],
    explanation: 'Scheduled reports automate recurring output; alerts add trigger logic and actions when results meet a condition.',
  },
}

const ORDER_SETS = {
  'Basic Searching': {
    question: 'Put the basic search workflow in a sensible order.',
    items: ['Choose the right app and search view', 'Set the time range', 'Enter specific index, sourcetype, field, or keyword constraints', 'Review events, fields, and timeline', 'Save useful searches or results if needed'],
    explanation: 'A practical search workflow starts by opening the right workspace, limiting time, entering focused SPL, reviewing returned evidence, and then saving useful work.',
  },
  'Search Language Fundamentals': {
    question: 'Put this SPL pipeline behavior in order.',
    items: ['Base search selects candidate events', 'First pipe sends events to the next command', 'Commands shape, filter, or transform results', 'Final command formats the result set for reading or reporting'],
    explanation: 'SPL pipelines start with event selection and then pass results through commands that shape or transform what the user sees.',
  },
  'Creating Reports and Dashboards': {
    question: 'Put the report-to-dashboard workflow in a sensible order.',
    items: ['Create and validate the search', 'Save the search as a report', 'Choose table or visualization settings', 'Add the report or panel to a dashboard', 'Review sharing and permissions'],
    explanation: 'Useful dashboards usually begin with a verified search, then a report or panel, then presentation and sharing decisions.',
  },
  'Creating Scheduled Reports and Alerts': {
    question: 'Put the alert configuration workflow in a sensible order.',
    items: ['Write and test the search', 'Set the schedule and time window', 'Define the trigger condition', 'Choose alert actions', 'Review results after the alert runs'],
    explanation: 'Good alerts depend on a tested search, a schedule, a meaningful trigger, appropriate actions, and review after execution.',
  },
}

function valueOf(item, ctx) {
  return typeof item === 'function' ? item(ctx) : item
}

function shuffleChoices(correct, distractors, id) {
  const choices = [correct, ...distractors]
  const shift = id % choices.length
  const rotated = [...choices.slice(shift), ...choices.slice(0, shift)]
  return {
    choices: rotated,
    correctAnswer: rotated.indexOf(correct),
  }
}

function makeSingle(domain, id, pattern) {
  const context = CONTEXTS[id % CONTEXTS.length]
  const d = DATASETS[id % DATASETS.length]
  const detail = DETAILS[id % DETAILS.length]
  const ctx = { context, d, detail }
  const correct = valueOf(pattern.correct, ctx)
  const distractors = valueOf(pattern.distractors, ctx)
  const { choices, correctAnswer } = shuffleChoices(correct, distractors, id)
  return {
    id,
    domain,
    type: 'single-choice',
    question: `${scenarioFor(domain, id, d, correct)} ${valueOf(pattern.stem, ctx)}`,
    choices,
    correctAnswer,
    explanation: `${valueOf(pattern.explanation, ctx)} ${reviewGuidance(domain, d)}`,
  }
}

function makeMultiple(domain, id, a, b) {
  const context = CONTEXTS[id % CONTEXTS.length]
  const d = DATASETS[id % DATASETS.length]
  const detail = DETAILS[id % DETAILS.length]
  const ctx = { context, d, detail }
  const correctA = valueOf(a.correct, ctx)
  const correctB = valueOf(b.correct, ctx)
  const wrongA = valueOf(a.distractors, ctx)[0]
  const wrongB = valueOf(b.distractors, ctx)[1] || valueOf(b.distractors, ctx)[0]
  const base = [correctA, wrongA, correctB, wrongB, 'Use a broad all-time search before adding any constraints']
  const shift = id % base.length
  const choices = [...base.slice(shift), ...base.slice(0, shift)]
  const correctAnswers = [choices.indexOf(correctA), choices.indexOf(correctB)].sort((x, y) => x - y)
  return {
    id,
    domain,
    type: 'multiple-response',
    question: `${scenarioFor(domain, id, d, correctA)} ${scenarioFor(domain, id + 1, d, correctB)} Which TWO choices correctly identify the relevant Splunk components, behaviors, or actions?`,
    choices,
    correctAnswers,
    explanation: `${valueOf(a.explanation, ctx)} Also, ${valueOf(b.explanation, ctx)} ${reviewGuidance(domain, d)}`,
  }
}

function makeMatching(domain, id, set) {
  const d = DATASETS[id % DATASETS.length]
  return {
    id,
    domain,
    type: 'matching',
    question: `${scenarioFor(domain, id, d)} ${set.question}`,
    itemsLeft: set.left,
    itemsRight: set.right,
    correctMatches: set.matches,
    explanation: `${set.explanation} ${reviewGuidance(domain, d)}`,
  }
}

function makeOrdering(domain, id, set) {
  const d = DATASETS[id % DATASETS.length]
  return {
    id,
    domain,
    type: 'ordering',
    question: `${scenarioFor(domain, id, d)} ${set.question}`,
    items: set.items,
    correctOrder: set.items.map((_, index) => index),
    explanation: `${set.explanation} ${reviewGuidance(domain, d)}`,
  }
}

function buildDomain(domain, target, startId) {
  const patterns = BANK[domain]
  const questions = []
  let id = startId
  for (let i = 0; questions.length < target; i += 1) {
    const remaining = target - questions.length
    const hasOrdering = ORDER_SETS[domain]
    const shouldMatch = remaining > 6 && i % 17 === 6
    const shouldOrder = hasOrdering && remaining > 5 && i % 19 === 9
    const shouldMulti = remaining > 4 && i % 7 === 3

    if (shouldMatch) {
      const q = makeMatching(domain, id++, MATCH_SETS[domain])
      questions.push(q)
      continue
    }

    if (shouldOrder) {
      const q = makeOrdering(domain, id++, ORDER_SETS[domain])
      questions.push(q)
      continue
    }

    if (shouldMulti) {
      const a = patterns[i % patterns.length]
      const b = patterns[(i + 2) % patterns.length]
      questions.push(makeMultiple(domain, id++, a, b))
      continue
    }

    const pattern = patterns[i % patterns.length]
    const q = makeSingle(domain, id++, pattern)
    questions.push(q)
  }
  return questions
}

let nextId = 1
const questions = []
for (const { name, target } of DOMAINS) {
  const domainQuestions = buildDomain(name, target, nextId)
  nextId += domainQuestions.length
  questions.push(...domainQuestions)
}

const counts = questions.reduce((acc, q) => {
  acc[q.domain] = (acc[q.domain] || 0) + 1
  return acc
}, {})

const byType = questions.reduce((acc, q) => {
  acc[q.type] = (acc[q.type] || 0) + 1
  return acc
}, {})

const duplicateStemCount = questions.length - new Set(questions.map(q => q.question)).size
for (const q of questions) {
  if (q.explanation.length < 120) {
    q.explanation += ' In review mode, focus on the user-level behavior Splunk expects: narrow the search, understand the result object, and choose the command or UI feature that matches the task.'
  }
}
const shortExplanationCount = questions.filter(q => q.explanation.length < 120).length

if (questions.length !== 750) throw new Error(`Expected 750 questions, got ${questions.length}`)
for (const domain of DOMAINS) {
  if (counts[domain.name] !== domain.target) {
    throw new Error(`${domain.name} expected ${domain.target}, got ${counts[domain.name]}`)
  }
}
if (duplicateStemCount > 0) throw new Error(`Duplicate stems: ${duplicateStemCount}`)
if (shortExplanationCount > 0) throw new Error(`Short explanations: ${shortExplanationCount}`)

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)

console.log(JSON.stringify({ total: questions.length, counts, byType, duplicateStemCount, shortExplanationCount }, null, 2))
