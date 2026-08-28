export type Project = {
  id: number;
  slug: string;
  title: string;
  type: string;
  /** Short line used on the bento tile and as the case-study meta description. */
  summary: string;
  image: string;
  tags: string[];
  /** External live URL, if the project is publicly reachable. */
  link?: string;
  year: string;
  /** Which engagement this came out of. Maps to ids in content/experience.ts. */
  roleId: "appsha" | "carthagos" | "freelance" | "personal";
  featured: boolean;
  caseStudy: {
    context: string;
    /** What the work actually involved. */
    work: string[];
    outcome?: string;
    stack: string[];
  };
  /**
   * True where the case study is written only from the stack and engagement type,
   * because no first-hand detail was available. These read thin on purpose rather
   * than inventing specifics. See the TODO list in the redesign notes.
   */
  needsDetail?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "appsha",
    title: "Appsha",
    type: "SaaS Platform",
    summary:
      "A SaaS platform re-architected from a Next.js monolith into a decoupled three-tier system, with a built-in CRM, live notifications, and real-time sync.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1772426088/appsha_f3y0ty.png",
    tags: ["Next.js", "Node.js", "CRM", "WebSockets", "AWS", "Strapi", "SaaS"],
    link: "https://appsha.com",
    year: "2025",
    roleId: "appsha",
    featured: true,
    caseStudy: {
      context:
        "Appsha had grown as a single Next.js application handling frontend, API, and business logic in one deployable unit. Every change, however small, meant redeploying the whole system, which made the application a single point of failure and coupled unrelated release cycles together. On top of that, the product needed to own the relationship side of its customers' work: inquiries arrived through bookings, forms, purchases, and downloads, and then lived nowhere in particular.",
      work: [
        "Led the migration from the monolithic Next.js application to a decoupled three-tier architecture, so frontend, API, and data layers could be deployed independently.",
        "Designed and built the RESTful API surface with JWT authentication and role-based access control, which now powers core platform functionality.",
        "Engineered a WebSocket-based real-time system for live data sync, replacing the previous polling approach.",
        "Built the live notification system on top of that WebSocket layer: events reach the user the moment they fire, are persisted so nothing is missed while a session is closed, and stay consistent across every tab a user has open.",
        "Built the platform's CRM (its contact and follow-up product) end to end, from the data model through the API to the interface customers work in, scoped deliberately as contacts, history, and the next step rather than a sales pipeline.",
        "Made contact capture automatic: every conversion event on a customer's profile (booking, form submission, purchase, file download, or service inquiry) writes a contact record, so the list builds itself with no manual entry, spreadsheets, or copy-paste between tools.",
        "Resolved contacts arriving from those different sources into one record per person, so a lead who first submits a form and later books is a single history rather than two disconnected entries.",
        "Modelled a full interaction history per contact (notes, logged interactions, activity, and follow-up detail), retained indefinitely, so a contact returning months later opens with the whole thread intact.",
        "Built email into the contact record itself: messages are composed and sent without leaving the platform, and each one is logged back against that contact automatically.",
        "Added deals and tasks on top of contacts, and tagged service inquiries with the service requested and the date it arrived, so follow-ups resolve to a concrete next step instead of depending on memory.",
        "Built an event-driven transactional email system on Loops, covering lifecycle events including trials, upgrades, downgrades, and payment failures.",
        "Integrated Strapi as the headless CMS so non-technical teams could manage content without a developer in the loop; it ran the platform's content for several months, before the marketing site was later moved onto a different CMS.",
        "Developed a Gemini-powered AI content generation feature, built around a reusable service and prompt architecture rather than one-off calls.",
        "Authored Swagger API documentation and internal architecture guides for developer onboarding.",
        "Managed the AWS footprint (EC2, database, and messaging) across all platform services.",
      ],
      outcome:
        "Independent deployments per tier and no single point of failure; polling replaced by pushed updates and live notifications; and a CRM where contacts capture themselves from every conversion event and carry their full history, email, and follow-ups on one record. Content turnaround dropped to same-day once the team could publish without a developer in the loop.",
      stack: [
        "Next.js",
        "Node.js",
        "Strapi",
        "Loops",
        "Gemini API",
        "REST APIs",
        "WebSockets",
        "Swagger",
        "AWS EC2",
      ],
    },
  },
  {
    id: 2,
    slug: "battalion-admin",
    title: "Battalion Admin",
    type: "Fleet & Device Admin",
    summary:
      "The panel that binds Battalion's connected toolboxes to the people allowed to open them, worked from either side: open a box to set its users, or open a person to set their boxes.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1728656978/admin_jjfbrx.png",
    tags: ["Next.js", "Connected Devices", "Dashboard", "Admin"],
    link: "https://battaliontool.com",
    year: "2024",
    roleId: "carthagos",
    featured: true,
    caseStudy: {
      context:
        "Battalion's Rover toolboxes are connected hardware rather than plain storage, and they open two ways: from the mobile app, or from a keypad code on the box itself. That makes access the thing actually worth managing. A box is no use to a crew that cannot open it, and rather worse than no use to a company that cannot stop a departing worker from opening it. What was missing was the surface where the relationship between a person and a box gets set.",
      work: [
        "Built the admin panel in Next.js across two sections, Devices and Users, each a searchable list with edit and delete on every row.",
        "Made the device and the user two views onto the same relationship: opening a device lists the users connected to it, opening a user lists the devices connected to them, and access is granted or revoked from whichever side the work happens to start on.",
        "Built the device record, covering its name and the current keypad passcode that opens the box, so a code can be read or changed without standing in front of the unit.",
        "Built the user record, covering name, email, phone, and occupation, with the option to remove a user outright or block them, which cuts access across every device at once instead of one connection at a time.",
        "Kept the panel writing to the same device and user records the mobile app reads, so a connection revoked here is refused the next time that phone tries to connect.",
      ],
      outcome:
        "Access stopped being a property of the physical box and became something editable. A new crew member gets connected to the boxes they need, and someone leaving is blocked once rather than unpaired device by device.",
      stack: ["Next.js", "Tailwind CSS", "REST APIs"],
    },
  },
  {
    id: 3,
    slug: "battalion-app",
    title: "Battalion App",
    type: "Cross-Platform Mobile",
    summary:
      "The phone half of a Battalion toolbox, talking to the unit directly over Bluetooth Low Energy: pair to a box, read its battery, temperature and lock state, open it, and run the heater. Owners decide who gets to connect.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1728639180/mobile1_u4sgpn.png",
    tags: ["React Native", "Expo", "BLE", "Offline-First", "Firebase"],
    link: "https://battaliontool.com",
    year: "2024",
    roleId: "carthagos",
    featured: true,
    caseStudy: {
      context:
        "A Rover toolbox opens two ways, from the keypad on the box or from a phone, and the phone half is this app. What joins the two is Bluetooth Low Energy, and that choice shapes everything above it: the phone speaks to the unit directly, in range, rather than asking a server to pass a message along. So the app answers what the keypad cannot, how much battery is left, what the temperature inside is, whether the box is locked right now, and it answers from the box itself. The harder part is that a box is rarely one person's. Crews share them, and the owner is often not the person standing in front of it, so connecting had to be something a person asks for and an owner grants, not something anyone within Bluetooth range can do.",
      work: [
        "Built and shipped the app from a single React Native codebase to both iOS and Android.",
        "Implemented the Bluetooth Low Energy layer that carries every exchange with the hardware: discovering units in range, establishing and holding the connection, reading characteristics off the box, and writing commands back to it.",
        "Built onboarding as one continuous path: sign up, confirm through an emailed code with resend, then register the first toolbox by scanning the barcode or QR code on the unit itself.",
        "Built the device dashboard on top of those BLE reads, so battery level, interior temperature, and lock state are what the box reports now rather than a server's last known copy of it.",
        "Built the two controls the hardware exposes, a temperature adjustment for the onboard heater and a lock and unlock action, each written to the unit over BLE, with unlock kept behind the device code so that holding an unlocked phone is not the same as holding the box.",
        "Built pairing as a request rather than a self-serve action. A user picks a box and enters its code or device number, and the attempt resolves as approved or rejected: approval opens that device's dashboard, rejection returns the user to their own home screen.",
        "Split the profile surface by role. An owner sees the users connected to their devices and can disconnect any of them; a user sees only the devices they have been granted, plus their own account and password reset.",
        "Kept the two channels doing separate jobs: BLE is how the app reaches the hardware, while Firebase Auth and Firestore hold who is allowed to reach it. Being in range gets a phone as far as the box, not into it, and a connection revoked on the server is revoked here.",
        "Persisted account and device state on the phone, which is what keeps the app working past the edge of coverage. A job site is exactly where signal fails and BLE does not, so a crew member already granted a box can still reach it and open it with no connectivity at all, and the app catches up with the API once it has a connection again.",
      ],
      outcome:
        "One codebase on both platforms, and a box a crew can share without sharing a code. Access is requested, granted by the owner, and withdrawn from a phone instead of by changing the keypad. Because the link to the hardware is BLE and the state that authorises it is held locally, none of that stops working when the site has no signal.",
      stack: ["React Native", "Bluetooth Low Energy (BLE)", "Expo", "Firebase"],
    },
  },
  {
    id: 4,
    slug: "battalion-tools",
    title: "Battalion Tools",
    type: "Pre-Launch Storefront",
    summary:
      "The Shopify storefront for a product category that did not exist yet, selling a heated toolbox on pre-order deposits before the first unit had shipped.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1728639499/heat1_vc7ndm.png",
    tags: ["Shopify", "Liquid", "Pre-Order", "E-Commerce"],
    link: "https://battaliontool.com",
    year: "2024",
    roleId: "carthagos",
    featured: false,
    caseStudy: {
      context:
        "Battalion was selling something buyers had no reference point for, a heated toolbox billed as the first of its kind, and selling it before it existed. Neither half of that is an ordinary storefront job. Someone who does not already know what the product is cannot be dropped on a product page and asked to add to cart, and a unit with no ship date cannot be sold the way stock is. The store had to teach the category, keep the difference between two models straight while the shopper decided, and take money for a thing that was not built yet.",
      work: [
        "Delivered the storefront on Shopify with a custom Liquid theme.",
        "Made model comparison a top-level destination rather than a table buried in a product page, because the choice a buyer is actually making is heated against unheated, not whether to buy at all.",
        "Structured the product pages to explain the category before asking for the sale: what the heater, the smart lock, the lightbars and the onboard power are each for.",
        "Built the pre-order path as its own flow, taking a deposit against a unit with no ship date and keeping it distinct from ordinary checkout, with orders still amendable up to availability.",
      ],
      stack: ["Shopify", "Liquid", "JavaScript"],
    },
    needsDetail: true,
  },
  {
    id: 5,
    slug: "cramers-uniforms",
    title: "Cramers Uniforms",
    type: "School Uniform Storefront",
    summary:
      "A full rebuild of the storefront for a fourth-generation uniform retailer, keyed to schools rather than products so a parent lands on exactly what their child's school requires.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1728641594/cramers_zqgibr.png",
    tags: ["Shopify", "Liquid", "Search & Filtering", "E-Commerce"],
    link: "https://www.cramersuniforms.com",
    year: "2024",
    roleId: "carthagos",
    featured: false,
    caseStudy: {
      context:
        "Cramer's has been outfitting Philadelphia schools since 1926, and four generations in, its catalogue is not really a catalogue of clothes. It is over a hundred schools, each with its own approved list, and a parent arriving in August is not browsing so much as filling a requirement: the right polo, in the right colour, with the right crest, for one specific school. A product-first storefront answers a question nobody asked. The business also still runs on its doors, three stores in Philadelphia, one in Delaware, and pop-up shops that appear on charter school campuses for a few weeks at a time, so the site has to send people to a location about as often as to a checkout.",
      work: [
        "Rebuilt the site end to end on Shopify with a custom Liquid theme, replacing the previous storefront rather than reskinning it.",
        "Made the school the primary axis of the catalogue: a search that takes a school name as its entry point, and the full list grouped by region across Philadelphia and Delaware, so a parent starts from their school rather than from the product range.",
        "Built filtering across the catalogue so a shopper narrows down within a school's approved set instead of scrolling it.",
        "Built out the locations surface, covering hours and addresses for the permanent stores alongside the pop-up shops that run on charter campuses to their own schedule.",
        "Expanded the payment methods accepted at checkout, adding wallet options next to cards so a parent can pay the way they already pay on a phone.",
        "Built the separate route for principals and administrators ordering on behalf of a school, which is a different job from a parent buying one child's set.",
      ],
      outcome:
        "A parent can start from a school name and reach a compliant set without knowing the product range first, and the stores and pop-ups are findable from the same site that sells to them.",
      stack: ["Shopify", "Liquid", "JavaScript"],
    },
  },
  {
    id: 6,
    slug: "graze-and-co",
    title: "Graze & Co",
    type: "DTC Storefront",
    summary:
      "A ground-up Shopify build for an Amish cheese cooperative, merchandised around bundled boxes so that shipping something perishable and refrigerated pays for itself.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1740457069/aunbzkvorj4pj4mcokub.png",
    tags: ["Shopify", "Liquid", "Bundles", "DTC", "E-Commerce"],
    link: "https://grazecheese.com",
    year: "2025",
    roleId: "carthagos",
    featured: false,
    caseStudy: {
      context:
        "Graze & Co sells small-batch cheese out of a farmer-owned cooperative in Amish country, which means every order is perishable and has to arrive cold inside about three days. That constraint sets the economics before a single design decision gets made. One cheese at fifteen dollars cannot carry the cost of refrigerated three-day delivery, so a store built the obvious way, as a grid of single cheeses, loses money on precisely the orders it is best at winning. The range needs explaining too: most people buying artisanal cheese online do not know a brick from a gouda well enough to assemble a good selection themselves.",
      work: [
        "Built the storefront from scratch on Shopify with a custom Liquid theme, the whole site rather than a slice of one.",
        "Introduced boxes as the primary way to buy, in four and six piece sizes, which carries an order past the point where cold chain delivery makes sense instead of leaving it underneath.",
        "Split those boxes into two kinds: curated sets themed by taste, running from mild through to bold and spicy, for a customer who wants the choice made for them, and build your own boxes for one who already knows what they want.",
        "Kept single cheeses in the range as an entry point rather than the main event, positioned beneath the boxes instead of competing with them.",
        "Surfaced the free shipping and box discount at the top of the shop, so the incentive a customer sees is attached to the same boxes the economics depend on.",
        "Built the subscription offer into the storefront, giving repeat delivery a standing discount.",
        "Built the store locator for the stockists carrying the cheese offline.",
      ],
      outcome:
        "The catalogue leads with boxes rather than singles, which is what lets a perishable product ship cold and still add up, and a customer with no cheese vocabulary can buy a considered selection without having to assemble one.",
      stack: ["Shopify", "Liquid", "JavaScript"],
    },
  },
  {
    id: 7,
    slug: "cstoresync",
    title: "CStoreSync",
    type: "Staff & Task Management",
    summary:
      "A role-based task management system for a convenience store and fuel stop, built so that a shift's work is assigned and recorded rather than remembered.",
    image:
      "https://res.cloudinary.com/dmufwerzv/image/upload/v1772424423/ruthtonexpress.com_omciwx.png",
    tags: ["Next.js", "Node.js", "Task Management", "RBAC", "Freelance"],
    link: "https://ruthtonexpress.com",
    year: "2025",
    roleId: "freelance",
    featured: true,
    caseStudy: {
      context:
        "Ruthton Express is a fuel stop, deli kitchen and jerky counter in rural Minnesota, open from six in the morning until nine at night with the pumps running around the clock. Work on that shape is not one job, it is a run of shifts, and the recurring parts of it live in whoever happens to be on: the opening and closing routines, the checks, the restocking. None of it carries between crews except by memory and whatever gets said at handover. Which leaves the owner as the tracking system, assigning by hand, chasing what got done, and hearing about anything missed only after it has been missed.",
      work: [
        "Built the system end to end on Next.js and Node.js over PostgreSQL, then deployed and configured it on AWS EC2.",
        "Modelled it around two roles, admin and employee, with access control drawn so that an owner or manager works across the whole operation while staff see the work that is theirs.",
        "Built task assignment as the central workflow: a task is created, assigned to a person, and carries a state the assignee moves it through, so completion is recorded as it happens rather than reported afterwards.",
        "Implemented full CRUD across staff and tasks alike, so the owner runs the system day to day without a developer in the loop.",
        "Replaced the manual tracking the owner had been keeping by hand, which is where the saving came from: assignment and follow up stopped living in one person's head.",
      ],
      outcome:
        "Assignment and follow up moved off the owner's memory and into something both roles can see. Staff open the app to find what is theirs, and the owner can tell what a shift actually did without asking the person who worked it.",
      stack: ["Next.js", "Node.js", "PostgreSQL", "AWS EC2"],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
