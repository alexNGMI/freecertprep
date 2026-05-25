import { writeFile } from 'node:fs/promises'

const OUT = new URL('../src/data/schneider-dcca-questions.json', import.meta.url)

const DOMAINS = [
  { name: 'Fundamentals of Availability', target: 54 },
  { name: 'Fire Protection Methods', target: 54 },
  { name: 'Cabling Strategies for Data Centers', target: 54 },
  { name: 'Fundamentals of Cooling', target: 54 },
  { name: 'Humidity in the Data Center', target: 54 },
  { name: 'Physical Security', target: 54 },
  { name: 'Fundamentals of Power', target: 54 },
  { name: 'Generator Fundamentals', target: 54 },
  { name: 'Optimizing Cooling Layouts', target: 54 },
  { name: 'Power Redundancy', target: 54 },
  { name: 'Power Distribution', target: 54 },
  { name: 'Rack Fundamentals', target: 54 },
  { name: 'Room, Row, and Rack Cooling', target: 51 },
  { name: 'Physical Infrastructure Management', target: 51 },
]

const CONTEXTS = [
  'during a pre-installation design review',
  'while walking a new data hall',
  'during a maintenance window planning call',
  'while reviewing a capacity request',
  'during a post-incident review',
  'while preparing a rack-and-stack work order',
  'during a critical facilities handoff',
  'while documenting a data center upgrade',
  'during an operations readiness review',
  'while onboarding a junior data center technician',
]

const SITES = [
  'a small enterprise server room',
  'a colocation suite',
  'an edge data center',
  'a high-density AI rack area',
  'a regional disaster recovery site',
  'a mixed-density production room',
  'a legacy raised-floor room',
  'a new modular data center pod',
]

const BANK = {
  'Fundamentals of Availability': [
    {
      correct: 'Improve redundancy and reduce single points of failure in critical infrastructure',
      distractors: ['Increase rack faceplate blanking only', 'Disable preventive maintenance to avoid planned work', 'Use only nameplate IT load for all capacity calculations'],
      stem: ({ site, context }) => `A team wants to improve the availability of ${site} ${context}. Which action best targets the physical infrastructure availability goal?`,
      explanation: 'Availability improves when critical infrastructure has fewer single points of failure and can tolerate component outages through redundancy, maintainability, and appropriate design. Blanking panels, nameplate-only estimates, or avoiding maintenance do not address the core availability architecture.',
    },
    {
      correct: 'Mean time to repair affects availability because faster recovery reduces outage duration',
      distractors: ['MTTR only affects energy efficiency', 'MTTR is unrelated when redundant power exists', 'MTTR is only used for cabling certification'],
      stem: ({ site }) => `A manager reviewing ${site} asks why repair time matters even when failures are infrequent. Which statement is most accurate?`,
      explanation: 'Availability is influenced by how often failures occur and how long service is unavailable when they happen. Lower MTTR improves availability because the affected service or component is restored faster.',
    },
    {
      correct: 'A single utility feed without alternate power path is a physical infrastructure single point of failure',
      distractors: ['A labeled patch panel is a single point of failure by itself', 'A rack with blanking panels creates a single point of failure', 'Hot aisle containment always removes power risk'],
      stem: ({ context }) => `A technician is identifying single points of failure ${context}. Which condition is the clearest physical infrastructure risk?`,
      explanation: 'A single utility feed or nonredundant power path can interrupt the data center if it fails. Labeling, blanking panels, and airflow containment are operational practices but are not the same as a nonredundant critical power path.',
    },
    {
      correct: 'Maintainability allows planned service without interrupting supported IT loads',
      distractors: ['Maintainability means every device must be air cooled', 'Maintainability eliminates all need for monitoring', 'Maintainability is the same as maximum rack density'],
      stem: ({ site }) => `A design goal for ${site} is to service UPS and cooling components without shutting down IT equipment. Which concept is being emphasized?`,
      explanation: 'Maintainability is the ability to perform planned maintenance, replacement, or service while preserving the intended load support. It is commonly achieved through redundant paths, bypasses, and modular components.',
    },
    {
      correct: 'Critical loads should be matched to infrastructure capacity and redundancy requirements',
      distractors: ['Only floor tile color determines availability', 'Cooling capacity can be ignored if UPS capacity is high', 'Physical security controls replace redundancy planning'],
      stem: ({ context }) => `A DCCA candidate is reviewing availability requirements ${context}. What should be aligned first?`,
      explanation: 'Availability design starts by matching the critical IT load to the required power, cooling, redundancy, and maintainability architecture. No single cosmetic or unrelated control replaces capacity and redundancy planning.',
    },
    {
      correct: 'A design with no bypass path can force downtime during maintenance',
      distractors: ['A bypass path is only used for humidity control', 'Bypass paths are only relevant to structured cabling', 'Maintenance downtime is unrelated to infrastructure topology'],
      stem: ({ site }) => `${site} must remain online during scheduled power equipment service. What design concern should be raised?`,
      explanation: 'If there is no bypass or alternate path around equipment that needs service, planned maintenance can interrupt the load. Bypass paths and redundant paths are key maintainability tools.',
    },
    {
      correct: 'The target availability level should be chosen from business impact and risk tolerance',
      distractors: ['Always choose the highest redundancy regardless of cost', 'Choose availability based only on the number of racks', 'Use the same availability target for every room worldwide'],
      stem: ({ context }) => `A business sponsor asks how to choose an availability target ${context}. What is the best answer?`,
      explanation: 'Availability targets should reflect business impact, downtime tolerance, budget, operational capability, and risk. The highest possible redundancy is not automatically the right design for every site.',
    },
    {
      correct: 'Document dependencies between power, cooling, network, and management systems',
      distractors: ['Track only server serial numbers', 'Ignore dependencies if equipment is new', 'Record only the public IP addresses'],
      stem: ({ site }) => `A team is creating an availability review for ${site}. Which documentation practice best supports accurate risk analysis?`,
      explanation: 'Physical infrastructure availability depends on interrelated systems. Documenting dependencies between power, cooling, cabling, network, and management systems helps reveal shared risks and support paths.',
    },
  ],
  'Fire Protection Methods': [
    {
      correct: 'Use early detection and appropriate clean-agent or pre-action protection for critical IT spaces',
      distractors: ['Install only portable water extinguishers inside each rack', 'Disable smoke detection to avoid nuisance alarms', 'Rely on server firmware alerts as the fire detection system'],
      stem: ({ site, context }) => `A team is selecting fire protection for ${site} ${context}. What approach best matches data center practice?`,
      explanation: 'Data centers commonly use early detection and fire suppression approaches selected to protect personnel and equipment, such as clean-agent systems or pre-action sprinklers where appropriate. Server alerts and portable extinguishers alone are not a complete strategy.',
    },
    {
      correct: 'Pre-action sprinklers reduce accidental water discharge risk compared with wet-pipe systems',
      distractors: ['Pre-action systems remove all need for smoke detection', 'Pre-action systems are used only for fiber rooms', 'Pre-action systems cool racks during normal operation'],
      stem: ({ context }) => `A facilities engineer recommends a pre-action sprinkler system ${context}. What is the main data center advantage?`,
      explanation: 'Pre-action sprinkler systems require detection and valve activation before water enters the piping, reducing accidental discharge risk compared with always-charged wet-pipe systems.',
    },
    {
      correct: 'Fire detection should alert staff early enough to investigate before suppression is required',
      distractors: ['Detection should wait until flames are visible', 'Detection is unnecessary if the room has UPS power', 'Detection is only needed outside the data hall'],
      stem: ({ site }) => `A new monitoring plan for ${site} includes very early smoke detection. Why is this valuable?`,
      explanation: 'Very early detection gives staff time to investigate smoke or overheating before a fire grows or suppression activates. This helps protect people, uptime, and equipment.',
    },
    {
      correct: 'Coordinate fire protection design with local codes and the authority having jurisdiction',
      distractors: ['Use only the server vendor installation guide', 'Let IT technicians override code requirements', 'Skip code review if the room is small'],
      stem: ({ context }) => `A DCCA candidate is reviewing fire protection requirements ${context}. What governance point is most important?`,
      explanation: 'Fire protection must comply with local codes, insurance requirements, and the authority having jurisdiction. Vendor guides do not replace legal and life-safety requirements.',
    },
    {
      correct: 'Cable penetrations should be properly firestopped to preserve rated barriers',
      distractors: ['Cable openings should remain unsealed for airflow', 'Firestopping is only needed for wireless access points', 'Firestopping is a UPS battery maintenance task'],
      stem: ({ site }) => `During a cabling project in ${site}, technicians route cables through a rated wall. What fire-safety requirement applies?`,
      explanation: 'Penetrations through fire-rated assemblies must be properly firestopped so the barrier continues to resist fire and smoke spread. Leaving openings unsealed compromises the rated wall.',
    },
    {
      correct: 'Suppression choice must consider personnel safety, equipment impact, and room characteristics',
      distractors: ['Choose suppression only by rack color', 'Always avoid suppression in electrical rooms', 'Select the largest cylinder without hazard analysis'],
      stem: ({ context }) => `A project team is comparing suppression options ${context}. What should drive the decision?`,
      explanation: 'Suppression systems must be chosen by hazard, room volume, occupancy, code, safety, equipment sensitivity, and operational requirements. The decision is not arbitrary.',
    },
    {
      correct: 'Emergency power-off procedures should be controlled and clearly documented',
      distractors: ['Any visitor should be able to shut down all racks', 'EPO procedures should be undocumented for security', 'EPO buttons replace fire detection systems'],
      stem: ({ site }) => `${site} has emergency power-off capability. What operational control is appropriate?`,
      explanation: 'Emergency shutdown controls must be protected from accidental activation and supported by clear procedures. They are life-safety tools, not substitutes for detection or suppression.',
    },
    {
      correct: 'Combustible storage should be kept out of data center white space',
      distractors: ['Cardboard storage improves humidity control', 'Packing material can be stored under raised floors', 'Combustibles should be placed in hot aisles only'],
      stem: ({ context }) => `During a housekeeping inspection ${context}, a technician finds cardboard and packing foam in the data hall. What is the best response?`,
      explanation: 'Combustible materials increase fire load and should not be stored in the data center white space or underfloor spaces. Good housekeeping supports fire prevention.',
    },
  ],
  'Cabling Strategies for Data Centers': [
    {
      correct: 'Use structured cabling with clear labeling, patch panels, and documented pathways',
      distractors: ['Run point-to-point cables wherever convenient', 'Avoid labels so layouts remain flexible', 'Bundle power and network cables tightly together'],
      stem: ({ site, context }) => `A technician is improving cabling in ${site} ${context}. Which strategy best supports maintainability?`,
      explanation: 'Structured cabling with labeling, patching fields, and documented pathways reduces errors and supports moves, adds, changes, and troubleshooting. Unlabeled point-to-point cabling becomes difficult to maintain.',
    },
    {
      correct: 'Separate power and data cabling to reduce interference and improve serviceability',
      distractors: ['Tie power and fiber tightly to save space', 'Route all cabling through cooling returns', 'Place patch cords across hot-aisle floor tiles'],
      stem: ({ context }) => `A new cable tray layout is being reviewed ${context}. What design practice is preferred?`,
      explanation: 'Power and data cabling should be organized and separated according to standards and site rules. This improves safety, reduces electromagnetic interference concerns, and makes service easier.',
    },
    {
      correct: 'Fiber is preferred for long runs, high bandwidth, and electrical isolation',
      distractors: ['Fiber is used only for rack grounding', 'Fiber always provides PoE to devices', 'Fiber is limited to one meter in data centers'],
      stem: ({ site }) => `${site} needs high-bandwidth links between distant rows. Which media choice is usually best?`,
      explanation: 'Fiber optic cabling supports high bandwidth over longer distances and is immune to electromagnetic interference. It does not carry PoE and is not limited to very short runs.',
    },
    {
      correct: 'Maintain bend radius and pulling tension limits to avoid cable damage',
      distractors: ['Bend radius applies only to power cords', 'Fiber can be kinked if link lights stay on', 'Pulling tension is not relevant after termination'],
      stem: ({ context }) => `A technician is installing fiber trunks ${context}. Which handling rule is most important?`,
      explanation: 'Fiber and copper cabling have bend radius and pulling tension limits. Exceeding them can cause attenuation, intermittent faults, or premature failure even if the link initially works.',
    },
    {
      correct: 'Use cable management to avoid blocking airflow at rack fronts and rears',
      distractors: ['Store slack cable in front of server fans', 'Use cable bundles as blanking panels', 'Block hot aisles to improve static pressure'],
      stem: ({ site }) => `A rack in ${site} has large cable bundles obstructing exhaust airflow. What should be corrected?`,
      explanation: 'Cable management must preserve airflow through equipment. Obstructing intakes or exhausts can create hot spots and reduce cooling effectiveness.',
    },
    {
      correct: 'Document both ends of each connection so troubleshooting can identify the path',
      distractors: ['Label only the switch end', 'Document only cable jacket color', 'Rely on memory for short links'],
      stem: ({ context }) => `A data center technician is updating cable records ${context}. What documentation practice is best?`,
      explanation: 'Both ends and intermediate patch points should be documented so the entire circuit path can be traced. Partial labeling increases troubleshooting time and mistakes.',
    },
    {
      correct: 'Copper Ethernet runs are distance-limited and should follow the applicable cabling category',
      distractors: ['Copper Ethernet can run unlimited distances if shielded', 'Category rating is unrelated to link speed', 'Patch-cord length never affects a copper channel'],
      stem: ({ site }) => `${site} is adding copper links for access devices. What cabling principle should guide the design?`,
      explanation: 'Copper twisted-pair Ethernet has distance and category requirements for reliable operation at target speeds. Installed channels and patch cords should meet the intended standard.',
    },
    {
      correct: 'Use overhead or underfloor pathways consistently with airflow and service plans',
      distractors: ['Route cables randomly to use all open spaces', 'Use abandoned cable as permanent pathway support', 'Place cabling where it blocks perforated tiles'],
      stem: ({ context }) => `A team is choosing cable pathways ${context}. What is the best planning approach?`,
      explanation: 'Cabling pathways must coordinate with airflow, power, physical access, firestopping, and service plans. Random routing creates operational and cooling problems.',
    },
  ],
}

const SHARED_BANKS = {
  'Fundamentals of Cooling': [
    ['Manage heat generated by IT equipment so inlet air remains within acceptable limits', 'Cooling removes the heat produced by IT load and infrastructure losses. The goal is reliable inlet conditions, not simply making the room feel cold.'],
    ['Every watt consumed by IT equipment becomes heat that cooling must remove', 'Electrical energy used by IT equipment ultimately appears as heat in the data center, so IT load drives cooling load.'],
    ['Use hot-aisle/cold-aisle orientation to reduce mixing of supply and return air', 'Alternating rack fronts and backs helps keep cold supply air and hot exhaust separated, improving cooling efficiency.'],
    ['Verify supply air reaches equipment intakes instead of bypassing directly to returns', 'Bypass airflow wastes cooling capacity because cold air returns without removing IT heat.'],
    ['Blanking panels reduce hot-air recirculation through unused rack spaces', 'Open rack spaces allow exhaust air to loop back to the front of equipment. Blanking panels help preserve front-to-back airflow.'],
    ['Cooling capacity should be planned from actual and forecast IT load, not only room size', 'Cooling demand follows heat load and density. Floor area alone does not determine cooling requirement.'],
    ['Monitor rack inlet temperatures to detect local hot spots', 'Rack inlet temperature reflects what IT equipment actually receives and is a key operational indicator.'],
    ['Coordinate cooling changes with rack density and airflow containment', 'Higher density racks often require better airflow management, containment, or targeted cooling strategies.'],
  ],
  'Humidity in the Data Center': [
    ['Keep humidity within recommended ranges to reduce electrostatic and condensation risks', 'Very low humidity increases electrostatic discharge risk, while high humidity can contribute to condensation and corrosion risks.'],
    ['Relative humidity changes as air temperature changes even when moisture content is constant', 'Relative humidity is temperature-dependent, so warmer air can hold more moisture before saturation.'],
    ['Avoid over-humidification that can create condensation on cold surfaces', 'Condensation near electrical equipment is a reliability and safety concern. Humidity control must avoid both extremes.'],
    ['Low humidity can increase electrostatic discharge risk around sensitive electronics', 'Dry air makes static charge buildup more likely, which can damage electronics during handling or maintenance.'],
    ['Humidity control should be coordinated with cooling controls instead of treated as unrelated', 'Cooling and humidity interact because temperature affects relative humidity and dehumidification may occur during cooling.'],
    ['Use environmental monitoring to trend humidity and temperature over time', 'Trends reveal control problems that spot checks may miss, especially across seasons and load changes.'],
    ['Place sensors where they reflect equipment inlet conditions and room behavior', 'Poor sensor placement can hide real risks or trigger misleading control responses.'],
    ['Investigate repeated humidity alarms before changing setpoints blindly', 'Persistent alarms may indicate control, sensor, infiltration, or cooling issues that require diagnosis.'],
  ],
  'Physical Security': [
    ['Use layered controls such as perimeter, room, row, rack, and visitor controls', 'Physical security is strongest when multiple layers delay, detect, and control access to critical infrastructure.'],
    ['Restrict data hall access to authorized personnel with a business need', 'Least privilege applies physically as well as logically. Data hall access should be controlled and auditable.'],
    ['Use visitor escort and logging procedures for non-authorized personnel', 'Visitor management reduces unauthorized access risk and supports incident review.'],
    ['Protect network, power, and management ports from unauthorized physical access', 'Physical access to infrastructure can lead to outages, tampering, or logical compromise.'],
    ['Cameras support deterrence and investigation but do not replace access control', 'Video monitoring is useful, but doors, badges, biometrics, and procedures still enforce access.'],
    ['Rack-level locking can protect colocated or high-risk equipment', 'Rack locks add a layer when multiple tenants or teams share a room or when sensitive equipment is present.'],
    ['Tailgating controls help prevent unauthorized entry behind authorized users', 'Mantraps, turnstiles, and security awareness reduce tailgating risk.'],
    ['Physical security procedures should include emergency access and audit review', 'Controls must support normal operations, emergencies, and accountability through logs and periodic review.'],
  ],
  'Fundamentals of Power': [
    ['Power design must deliver conditioned, reliable electrical power to IT loads', 'Data center power systems support equipment through utility feeds, switchgear, UPS, PDUs, branch circuits, and grounding.'],
    ['UPS systems bridge short outages and condition power for critical loads', 'UPS equipment provides temporary ride-through and power quality support until utility returns or generators carry the load.'],
    ['Load should be calculated against usable circuit capacity, not just connector shape', 'Circuit rating, derating rules, voltage, phase, and redundancy all affect usable capacity.'],
    ['Grounding and bonding support safety and stable electrical reference points', 'Grounding and bonding reduce shock hazards and support proper operation of electrical protection systems.'],
    ['Power quality events can include sags, surges, spikes, and outages', 'Power disturbances can cause equipment resets, damage, or transfer events. Power conditioning and protection reduce risk.'],
    ['Measure actual power draw when planning capacity for dense racks', 'Nameplate ratings are often conservative; actual measured load supports better capacity decisions.'],
    ['Balance loads across phases where three-phase distribution is used', 'Unbalanced phases can reduce efficiency, create capacity issues, and stress distribution equipment.'],
    ['Coordinate electrical work with safety procedures and qualified personnel', 'Data center electrical systems can be hazardous and must be serviced according to safety policy and code.'],
  ],
  'Generator Fundamentals': [
    ['Generators provide extended backup power after UPS ride-through during utility loss', 'UPS batteries handle immediate transition, while generators support longer outages when properly started and loaded.'],
    ['Fuel supply and runtime planning are part of generator availability', 'A generator cannot support extended outages without adequate fuel, delivery plans, and maintenance.'],
    ['Regular testing helps reveal generator start, transfer, and load issues before an outage', 'Testing under appropriate conditions validates readiness and uncovers failures while utility power is available.'],
    ['Automatic transfer equipment shifts load between utility and generator sources', 'Transfer switches coordinate source changes so critical loads can move to backup generation.'],
    ['Generator capacity must include supported loads and starting/transient behavior', 'Sizing should account for load profile, step loading, and mechanical/electrical characteristics, not just steady-state IT load.'],
    ['Exhaust, ventilation, noise, and local code constraints affect generator installation', 'Generators are building systems with environmental, safety, and permitting requirements.'],
    ['Battery chargers, block heaters, and controls are part of generator readiness', 'Auxiliary systems help ensure the generator can start and operate when needed.'],
    ['Generator maintenance should be documented and coordinated with facility operations', 'Maintenance records and procedures support reliability, compliance, and incident analysis.'],
  ],
  'Optimizing Cooling Layouts': [
    ['Separate hot and cold air streams to reduce recirculation and bypass airflow', 'Cooling layout optimization focuses on delivering cold air to intakes and returning hot exhaust efficiently.'],
    ['Containment can improve efficiency by isolating hot or cold aisles', 'Aisle containment reduces mixing and can allow better temperature control and cooling unit efficiency.'],
    ['Place high-density loads where the cooling design can support them', 'Dense racks may exceed local airflow or cooling capacity if placed without planning.'],
    ['Use blanking panels and brush grommets to close unmanaged airflow paths', 'Unsealed openings allow bypass or recirculation that reduces cooling effectiveness.'],
    ['Avoid placing perforated tiles where cold air bypasses equipment intakes', 'Perforated tiles should be placed to serve rack intakes, not open spaces or hot aisles.'],
    ['Trend temperatures across rows to identify hot spots and stranded capacity', 'Environmental monitoring reveals uneven cooling and capacity that is unavailable where needed.'],
    ['Coordinate cable management with airflow paths', 'Large cable bundles can block exhaust or intake airflow, creating local hot spots.'],
    ['Review cooling layout when IT load, rack density, or containment changes', 'Cooling layouts are not static; workload and physical changes can alter airflow behavior.'],
  ],
  'Power Redundancy': [
    ['N+1 provides one additional component beyond the minimum required capacity', 'N+1 redundancy allows a single component failure or maintenance event while still supporting the load.'],
    ['2N provides two independent capacity paths, each able to support the full load', '2N is more resilient and costly than N+1 because each side can carry the critical load independently.'],
    ['Dual-corded equipment should connect to independent power paths when available', 'Plugging both cords into the same path defeats the purpose of redundant power supplies.'],
    ['Redundancy must be preserved through the full chain, not just at the UPS', 'A redundant UPS does not help if downstream PDUs, breakers, or rack power create a single point of failure.'],
    ['Load sharing should be planned so failover does not overload the surviving path', 'If one path fails, the remaining path must have enough spare capacity to carry transferred load.'],
    ['Maintenance bypass can preserve load support during UPS service', 'Bypass arrangements allow service work without interrupting the critical load when designed and operated correctly.'],
    ['Redundant design should match business requirements and budget', 'Higher redundancy improves availability but increases cost and complexity, so it should match risk tolerance.'],
    ['Test failover behavior before relying on redundancy in production', 'Redundancy must be validated through commissioning and operational testing.'],
  ],
  'Power Distribution': [
    ['PDUs distribute upstream power to branch circuits and rack loads', 'Power distribution units and panels deliver conditioned power from UPS or switchgear to IT equipment.'],
    ['Rack PDUs should match voltage, phase, connector type, and monitored capacity needs', 'Choosing rack PDUs requires understanding equipment plugs, load, redundancy, and monitoring requirements.'],
    ['Branch circuits must not be loaded beyond permitted continuous-use capacity', 'Electrical code and site policy typically limit continuous loading below breaker nameplate rating.'],
    ['Metered power distribution supports capacity planning and overload prevention', 'Monitoring at panel or rack level helps operators understand real load and available headroom.'],
    ['Three-phase distribution can improve efficiency and capacity for larger loads', 'Three-phase power is common in data centers because it supports high power density efficiently.'],
    ['Whips, receptacles, and rack PDU outlets must match equipment plug requirements', 'Connector mismatch causes deployment delays and unsafe workarounds.'],
    ['Power path documentation helps technicians avoid accidental overloads or wrong-side connections', 'Accurate circuit and rack PDU records support safe changes and troubleshooting.'],
    ['Coordinate power distribution with redundancy groups such as A and B feeds', 'A/B feed design helps preserve power when one side is unavailable, but only if loads are connected correctly.'],
  ],
  'Rack Fundamentals': [
    ['Standard rack units are 1.75 inches high and equipment height is measured in U', 'Rack unit sizing lets technicians plan vertical capacity and equipment placement.'],
    ['Heavier equipment should generally be installed lower in the rack', 'Low placement improves stability and reduces tip risk during installation or service.'],
    ['Blanking panels close unused front spaces to preserve front-to-back airflow', 'Open spaces can allow hot exhaust to recirculate to equipment intakes.'],
    ['Rack grounding and bonding should follow site electrical requirements', 'Grounding and bonding support safety and electrical system integrity.'],
    ['Plan rack layout around power, cooling, weight, cable access, and service clearance', 'Rack placement is not only about U count; infrastructure constraints determine safe usable capacity.'],
    ['Use proper rails and lifting procedures when installing heavy servers', 'Improper installation can injure technicians or damage equipment.'],
    ['Maintain front and rear clearances for airflow and service access', 'Blocked doors, cable arms, or aisles can restrict cooling and maintenance.'],
    ['Document rack elevations so teams know where equipment and reserved space are located', 'Rack elevation records reduce mistakes during deployments and audits.'],
  ],
  'Room, Row, and Rack Cooling': [
    ['Room cooling conditions the overall room and depends heavily on airflow management', 'Room-based cooling can work well, but unmanaged airflow can create hot spots and inefficiency.'],
    ['Row cooling places cooling close to a row of racks for more targeted heat removal', 'Row-based cooling can support higher densities by shortening the airflow path.'],
    ['Rack cooling targets individual racks or enclosures for high-density loads', 'Rack-based cooling can address very high-density or specialized equipment where room cooling is insufficient.'],
    ['Cooling architecture should match density, layout, growth, and operational needs', 'Room, row, and rack cooling are design choices, not universal winners.'],
    ['Higher-density racks may need row or rack cooling when room airflow cannot support them', 'Localized high-density loads can exceed the capability of broad room cooling.'],
    ['Room cooling may be simpler for low to moderate density environments', 'For conventional densities, room-based cooling can be cost-effective if airflow is well managed.'],
    ['Row and rack cooling can reduce mixing by putting cooling closer to the heat source', 'Shorter airflow paths often improve predictability and efficiency.'],
    ['The best cooling approach should consider redundancy, maintenance, and scalability', 'Cooling selection must support availability and operations, not only initial capacity.'],
  ],
  'Physical Infrastructure Management': [
    ['DCIM-style tools help monitor capacity, assets, power, cooling, and environmental status', 'Infrastructure management connects operational data so teams can plan and respond accurately.'],
    ['Accurate asset and connection records reduce troubleshooting and change errors', 'Data center operations depend on knowing where equipment is, how it is powered, and how it is connected.'],
    ['Environmental monitoring supports early detection of hot spots and humidity problems', 'Sensors and alarms help operators act before conditions threaten equipment.'],
    ['Capacity management tracks space, power, cooling, and network constraints together', 'A rack may have physical space but lack power or cooling capacity, so all constraints matter.'],
    ['Change management reduces risk from unplanned or undocumented work', 'Documented approvals and procedures help prevent accidental outages.'],
    ['Monitoring thresholds should trigger investigation before equipment reaches unsafe conditions', 'Alarms are most useful when they give operators time to act before service is affected.'],
    ['Physical infrastructure management supports both operations and planning', 'Current-state data improves incident response and future design decisions.'],
    ['Reports should reflect actual measured conditions rather than assumptions alone', 'Measured data improves capacity planning and reduces stranded or hidden risk.'],
  ],
}

const ORDERING = {
  'Fundamentals of Availability': ['Define business availability target', 'Identify single points of failure', 'Choose redundancy and maintainability design', 'Test and document failure response'],
  'Fire Protection Methods': ['Detect smoke or abnormal condition', 'Alert occupants and operations staff', 'Confirm event according to procedure', 'Activate suppression or emergency response if required'],
  'Cabling Strategies for Data Centers': ['Plan pathway and port requirements', 'Install and terminate cabling', 'Label both ends and patch fields', 'Test and document the connection'],
  'Fundamentals of Cooling': ['Estimate IT heat load', 'Plan supply and return airflow', 'Install containment or airflow controls', 'Monitor inlet temperatures'],
  'Humidity in the Data Center': ['Measure temperature and humidity', 'Compare readings to target range', 'Investigate control or sensor issues', 'Adjust controls after confirming root cause'],
  'Physical Security': ['Define authorized roles', 'Enforce access control', 'Log and escort visitors', 'Review access records'],
  'Fundamentals of Power': ['Estimate critical load', 'Select distribution and UPS capacity', 'Connect loads to planned circuits', 'Monitor utilization and power quality'],
  'Generator Fundamentals': ['Utility power fails', 'UPS carries critical load immediately', 'Generator starts and stabilizes', 'Transfer equipment shifts load to generator source'],
  'Optimizing Cooling Layouts': ['Identify hot spots', 'Check airflow paths and openings', 'Correct containment or tile placement', 'Verify temperatures after changes'],
  'Power Redundancy': ['Identify required load capacity', 'Design redundant A/B paths', 'Connect dual-corded loads correctly', 'Validate failover without overload'],
  'Power Distribution': ['Verify equipment plug and power needs', 'Select appropriate rack PDU and circuit', 'Install and label connections', 'Monitor load against capacity'],
  'Rack Fundamentals': ['Confirm rack position and capacity', 'Install heavy equipment low in rack', 'Add cable management and blanking panels', 'Update rack elevation documentation'],
  'Room, Row, and Rack Cooling': ['Determine rack density and layout', 'Compare room, row, and rack options', 'Select cooling architecture', 'Validate under expected load'],
  'Physical Infrastructure Management': ['Collect asset and sensor data', 'Correlate space, power, cooling, and connections', 'Review alarms and capacity trends', 'Plan changes from measured conditions'],
}

const MATCHING = {
  'Fundamentals of Availability': [['MTBF', 'Failure frequency indicator'], ['MTTR', 'Repair duration indicator'], ['N+1', 'One extra component beyond required capacity'], ['Single point of failure', 'One failed element can interrupt service']],
  'Fire Protection Methods': [['Pre-action sprinkler', 'Water held back until detection and valve action'], ['Clean agent', 'Suppression selected to limit equipment residue'], ['Firestop', 'Seal that preserves rated wall or floor barrier'], ['Very early detection', 'Warns before a fire grows']],
  'Cabling Strategies for Data Centers': [['Patch panel', 'Organized termination and patching point'], ['Fiber', 'High bandwidth and EMI-resistant medium'], ['Bend radius', 'Minimum safe cable bend limit'], ['Labeling', 'Identification for both ends of a circuit']],
  'Fundamentals of Cooling': [['Bypass airflow', 'Cold air returns without cooling equipment'], ['Recirculation', 'Hot exhaust returns to equipment intake'], ['Blanking panel', 'Covers unused rack space'], ['Hot aisle', 'Rack exhaust side']],
  'Humidity in the Data Center': [['Low humidity', 'Higher electrostatic discharge risk'], ['High humidity', 'Condensation or corrosion concern'], ['Relative humidity', 'Moisture measure affected by temperature'], ['Sensor trend', 'Time-based environmental evidence']],
  'Physical Security': [['Mantrap', 'Controlled entry space'], ['Badge reader', 'Access authentication control'], ['Visitor log', 'Audit record for guests'], ['Rack lock', 'Equipment-level physical control']],
  'Fundamentals of Power': [['UPS', 'Short-term backup and conditioning'], ['PDU', 'Distributes power to downstream loads'], ['Grounding', 'Electrical safety and reference path'], ['Surge', 'Power quality disturbance']],
  'Generator Fundamentals': [['Generator', 'Extended backup source'], ['Fuel system', 'Runtime dependency'], ['Transfer switch', 'Moves load between sources'], ['Load test', 'Readiness validation']],
  'Optimizing Cooling Layouts': [['Containment', 'Separates supply and return air'], ['Perforated tile', 'Delivers underfloor supply air'], ['Hot spot', 'Localized high inlet temperature'], ['Brush grommet', 'Seals cable opening']],
  'Power Redundancy': [['N+1', 'One spare beyond required capacity'], ['2N', 'Two full independent capacity paths'], ['A/B feeds', 'Separate power paths to dual-corded equipment'], ['Failover load', 'Load carried by surviving path']],
  'Power Distribution': [['Branch circuit', 'Downstream electrical path to load'], ['Rack PDU', 'Outlet strip or monitored rack distribution'], ['Three-phase', 'Common higher-capacity distribution method'], ['Derating', 'Usable capacity below breaker nameplate for continuous load']],
  'Rack Fundamentals': [['1U', '1.75 inches of rack height'], ['Blanking panel', 'Fills unused front rack space'], ['Rack elevation', 'Documented vertical layout'], ['Rail kit', 'Mounting support for equipment']],
  'Room, Row, and Rack Cooling': [['Room cooling', 'Conditions the broad room environment'], ['Row cooling', 'Targets a row of racks'], ['Rack cooling', 'Targets an individual enclosure'], ['High density', 'May require localized cooling']],
  'Physical Infrastructure Management': [['DCIM', 'Infrastructure monitoring and planning toolset'], ['Capacity management', 'Tracks space, power, cooling, and network constraints'], ['Change management', 'Controls risk from planned work'], ['Environmental monitoring', 'Tracks temperature and humidity conditions']],
}

const DISTRACTORS = [
  'Increase decorative lighting in the data hall',
  'Use only server hostname naming conventions',
  'Disable alarms during normal business hours',
  'Choose equipment based only on bezel color',
  'Store spare cardboard under raised floor tiles',
  'Ignore measured load when nameplate ratings exist',
  'Route temporary cables across active service aisles',
  'Treat all racks as identical regardless of density',
]

function conceptsFor(domain) {
  return BANK[domain] || SHARED_BANKS[domain].map(([correct, explanation]) => ({
    correct,
    distractors: DISTRACTORS.filter(d => d !== correct).slice(0, 3),
    stem: ({ site, context }) => `A DCCA candidate is evaluating ${site} ${context}. Which statement is most accurate?`,
    explanation,
  }))
}

function rotate(arr, n) {
  return arr.slice(n % arr.length).concat(arr.slice(0, n % arr.length))
}

function idFor(domain, n) {
  const slug = domain.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `dcca-${slug}-${String(n).padStart(3, '0')}`
}

function singleQuestion(domain, seq, variant) {
  const concepts = conceptsFor(domain)
  const spec = concepts[(seq + variant) % concepts.length]
  const site = SITES[(seq + variant) % SITES.length]
  const context = CONTEXTS[(seq * 2 + variant) % CONTEXTS.length]
  const stem = spec.stem ? spec.stem({ site, context }) : `A DCCA candidate is evaluating ${site} ${context}. Which statement is most accurate?`
  const choices = rotate([spec.correct, ...spec.distractors], seq)
  return {
    id: idFor(domain, seq),
    domain,
    type: 'single-choice',
    question: `${stem} Ticket DCCA-${String(seq).padStart(3, '0')}.`,
    choices,
    correctAnswer: choices.indexOf(spec.correct),
    explanation: withExplanationFloor(spec.explanation),
  }
}

function withExplanationFloor(explanation) {
  if (explanation.length >= 120) return explanation
  return `${explanation} The other options are incomplete or unrelated to the DCCA physical infrastructure objective being tested.`
}

function multipleResponse(domain, seq) {
  const concepts = conceptsFor(domain)
  const a = concepts[seq % concepts.length]
  const b = concepts[(seq + 3) % concepts.length]
  const choices = rotate([a.correct, b.correct, ...DISTRACTORS.slice(seq % 4, (seq % 4) + 3)], seq).slice(0, 5)
  const correctAnswers = [choices.indexOf(a.correct), choices.indexOf(b.correct)].sort((x, y) => x - y)
  return {
    id: idFor(domain, seq),
    domain,
    type: 'multiple-response',
    question: `A team is reviewing ${domain.toLowerCase()} controls for ${SITES[seq % SITES.length]}. Which TWO statements align best with Schneider DCCA physical-infrastructure guidance?`,
    choices,
    correctAnswers,
    explanation: withExplanationFloor(`${a.explanation} Also, ${b.explanation.charAt(0).toLowerCase()}${b.explanation.slice(1)}`),
  }
}

function orderingQuestion(domain, seq) {
  const items = ORDERING[domain]
  const rotated = rotate(items, seq)
  return {
    id: idFor(domain, seq),
    domain,
    type: 'ordering',
    question: `Place these ${domain.toLowerCase()} activities in the best operational order for ${SITES[seq % SITES.length]} during ticket DCCA-${String(seq).padStart(3, '0')}.`,
    items: rotated,
    correctOrder: items.map(item => rotated.indexOf(item)),
    explanation: `The preferred sequence is: ${items.join(' -> ')}. This order moves from assessment or trigger, through planning or action, and ends with validation/documentation.`,
  }
}

function matchingQuestion(domain, seq) {
  const pairs = MATCHING[domain]
  const left = pairs.map(p => p[0])
  const rightBase = pairs.map(p => p[1])
  const right = rotate(rightBase, seq)
  return {
    id: idFor(domain, seq),
    domain,
    type: 'matching',
    question: `Match each ${domain.toLowerCase()} term to its best description for ticket DCCA-${String(seq).padStart(3, '0')}.`,
    itemsLeft: left,
    itemsRight: right,
    correctMatches: rightBase.map(item => right.indexOf(item)),
    explanation: pairs.map(([term, desc]) => `${term}: ${desc}.`).join(' '),
  }
}

const questions = []
for (const domain of DOMAINS) {
  for (let i = 0; i < domain.target; i += 1) {
    const seq = questions.length + 1
    if (i % 15 === 13) {
      questions.push(matchingQuestion(domain.name, seq))
    } else if (i % 15 === 14) {
      questions.push(orderingQuestion(domain.name, seq))
    } else if (i % 7 === 6) {
      questions.push(multipleResponse(domain.name, seq))
    } else {
      questions.push(singleQuestion(domain.name, seq, i))
    }
  }
}

await writeFile(OUT, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Wrote ${questions.length} questions to ${OUT}`)
