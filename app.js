const pressurePoints = [
  {
    id: "strategy",
    label: "Strategy",
    kicker: "Turn intent into choices",
    title: "Executive scope starts when strategy stops being a slogan.",
    summary:
      "The role changes when you stop optimising a local technical surface and start choosing where the organisation will and will not compete, invest, simplify, or stop.",
    traps: [
      "Confusing vision, mission, and tactics with actual strategy.",
      "Running every initiative with the same management model regardless of uncertainty.",
      "Treating the portfolio like a wish list instead of a set of explicit trade-offs.",
    ],
    moves: [
      "Translate strategic change into concrete project outcomes that teams can act on.",
      "Match the management system to the type of project and the level of uncertainty.",
      "Keep a visible portfolio of run, grow, and exploratory bets instead of hiding them in budget lines.",
    ],
    signals: [
      "Teams can explain why the work exists and what changes if it succeeds.",
      "Trade-offs are explicit rather than quietly deferred.",
      "Measures track outcomes and decision quality, not just activity volume.",
    ],
  },
  {
    id: "culture",
    label: "Culture",
    kicker: "Reward the behaviour you actually need",
    title: "Culture cannot be imposed; it has to be redesigned through the system.",
    summary:
      "Culture is inherited from the organisation's history, incentives, and tolerated behaviour. If the operating model rewards the old pattern, the old pattern wins.",
    traps: [
      "Expecting a service mentality without changing service design or accountability.",
      "Rewarding heroics, status, or passive tenure over contribution and learning.",
      "Advertising weak delivery as success because admitting the truth feels politically expensive.",
    ],
    moves: [
      "Name the current culture honestly before talking about the target culture.",
      "Build rituals, incentives, and review language around service quality and clarity.",
      "Let operational pain reach executive decisions instead of being filtered into silence.",
    ],
    signals: [
      "Users feel served rather than tolerated.",
      "Bad news travels early and without punishment theatre.",
      "Performance language is specific, grounded, and credible.",
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    kicker: "Governance should know the work",
    title: "Complex delivery breaks when governance is either absent or disconnected.",
    summary:
      "The usual failure pattern is not lack of effort. It is schedule obsession, weak ownership, and a steering layer that does not understand the quality of the system being built.",
    traps: [
      "Prioritising schedule optics while solution quality quietly collapses.",
      "Continuing bad trajectories because sunk cost feels safer than changing course.",
      "Keeping risk lists as compliance objects instead of action systems with owners.",
    ],
    moves: [
      "Make ownership crisp across teams, systems, and escalations.",
      "Build steering structures that understand the team, the customer, and the actual system.",
      "Use risk management to trigger action, buffer, and re-planning, not paperwork.",
    ],
    signals: [
      "Dependencies are visible and discussed before they become blockers.",
      "Risks have named owners and concrete responses.",
      "The organisation can change course without turning every change into drama.",
    ],
  },
  {
    id: "product",
    label: "Product",
    kicker: "Design the experience, not only the platform",
    title: "Technical product work improves when the user journey is treated as core design.",
    summary:
      "Too many technical programmes jump straight to the solution. Better product leadership starts with the challenge, the persona, the adoption path, the support model, and the economics.",
    traps: [
      "Rushing into solution mode before defining the challenge in user terms.",
      "Inventing a new workflow when an existing familiar workflow would reduce adoption friction.",
      "Calling a weak first release an MVP even when it does not create usable value.",
    ],
    moves: [
      "Define the problem from the user's point of view before discussing architecture.",
      "Make requests, approvals, support, and escalation feel boring in the best possible way.",
      "Run small experiments with weekly objectives, clear questions, and visible boards.",
    ],
    signals: [
      "Users know how to ask for something, track it, and escalate it.",
      "Operations, HR, and technical teams share a source of truth.",
      "Experiments answer concrete questions instead of generating theatre.",
    ],
  },
  {
    id: "partnerships",
    label: "Partnerships",
    kicker: "Interfaces need ownership",
    title: "Partners amplify whatever ambiguity you leave in the system.",
    summary:
      "Vendors, suppliers, and internal partner teams work well when ownership is clear, expectations are operationalised, and relationships exist beyond the sales layer.",
    traps: [
      "Selecting the cheapest partner instead of the best delivery fit.",
      "Signing contracts without operating procedures and escalation routines.",
      "Relying on account managers while never meeting the people who will do the work.",
    ],
    moves: [
      "Choose partners on fit, track record, and delivery attitude, not headline price.",
      "Define who owns what at every interface, including monitoring and improvement.",
      "Create routines that surface issues early before they become formal disputes.",
    ],
    signals: [
      "People know exactly who owns which deliverable and decision.",
      "SOPs exist, are maintained, and are actually used.",
      "Cross-partner alignment happens before issues compound.",
    ],
  },
  {
    id: "learning",
    label: "Learning",
    kicker: "Make knowledge survive the project",
    title: "If learning is optional, the organisation forgets at the same rate it ships.",
    summary:
      "A technical organisation gets stronger when it converts tacit knowledge into explicit practice, gives people time to learn, and rewards reuse rather than lonely heroism.",
    traps: [
      "Keeping critical know-how trapped in individual experts.",
      "Leaving no time for documentation, teaching, or reflection.",
      "Rewarding uniqueness and urgency more than reusable capability.",
    ],
    moves: [
      "Use PDCA loops, audits, post-mortems, templates, and experiment logs.",
      "Turn tacit knowledge into explicit patterns that others can apply.",
      "Reward documentation, mentoring, teaching, and cross-team reuse as real work.",
    ],
    signals: [
      "New staff ramp without folklore and hidden rituals.",
      "Teams reuse patterns instead of rebuilding the same answers from scratch.",
      "Failure produces better decisions next time rather than quiet blame.",
    ],
  },
];

const buttonsContainer = document.getElementById("navigator-buttons");
const panelKicker = document.getElementById("panel-kicker");
const panelTitle = document.getElementById("panel-title");
const panelSummary = document.getElementById("panel-summary");
const panelTraps = document.getElementById("panel-traps");
const panelMoves = document.getElementById("panel-moves");
const panelSignals = document.getElementById("panel-signals");

function fillList(element, items) {
  element.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function setActivePoint(id) {
  const point = pressurePoints.find((item) => item.id === id) || pressurePoints[0];
  panelKicker.textContent = point.kicker;
  panelTitle.textContent = point.title;
  panelSummary.textContent = point.summary;
  fillList(panelTraps, point.traps);
  fillList(panelMoves, point.moves);
  fillList(panelSignals, point.signals);

  buttonsContainer.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.pointId === point.id);
  });
}

pressurePoints.forEach((point) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.pointId = point.id;
  button.textContent = point.label;
  button.addEventListener("click", () => setActivePoint(point.id));
  buttonsContainer.appendChild(button);
});

setActivePoint(pressurePoints[0].id);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  if (!element.classList.contains("is-visible")) {
    observer.observe(element);
  }
});
