# Can Crowds Govern Wisely? An Explainer on Epistemic Democracy

Oct 6, 2026 · @Stephen Oates

## The question in brief

The debate asks whether ordinary citizens, taken together, can make good political decisions in a world too complex for any one of them to understand. Walter Lippmann argued in 1922 that they cannot. A century of theory and experiment has neither confirmed him nor buried him.

Three broad positions have emerged.

- **Pessimists** (Lippmann, Converse, Achen and Bartels, Brennan) hold that voters know little and err in the same direction, so adding them up does not help.
- **Optimists** (Dewey, Page, Landemore) hold that groups know more than their members, and that large, diverse, deliberating groups can outperform expert elites.
- **Conditionalists** (most of the experimentalists) hold that crowd wisdom is real but fragile. It depends on independence, network structure and how discussion is organised.

The current state of play is that crowds are neither wise nor foolish by nature. The formal results show ways in which numbers can help, and each rests on assumptions that politics may not meet. The experiments support a conditional claim: suitably structured deliberation improves accuracy or reasoning on some tasks and reduces polarisation on others.

Collective intelligence is therefore an institutional achievement. It depends on how information, diversity, independence, expertise and communication are organised. The open frontier is whether markets and AI can supply that organisation at the scale of a whole society.

## Lippmann's challenge and Dewey's reply

Lippmann's claim is that citizens respond to a "pseudo-environment", a simplified picture assembled from news and stereotype, and not to the world itself (Lippmann 1922). His argument runs in three steps.

1. **The world is out of reach.** Modern society is too large and fast to know first-hand, so people rely on reports. Reports are selective. Lippmann and Merz (1920) found that the *New York Times* announced the Bolshevik regime's collapse, or its imminent collapse, 91 times in two years.
2. **The omnicompetent citizen is a myth.** Democratic theory assumes a voter with an informed opinion on every public question. Nobody has the time or attention to be that person.
3. **The remedy is organised expertise.** Independent bureaus of experts should make the unseen facts intelligible to decision-makers. By *The Phantom Public* (Lippmann 1925) he had reduced the public's role to occasionally backing or removing the insiders.

John Dewey accepted the diagnosis and rejected the cure. In *The Public and Its Problems* (Dewey 1927) he argued that experts cut off from the public become a class with private interests and partial knowledge. The person affected by a policy knows where it hurts, even if the specialist knows best how to fix it. For Dewey the real deficit was in communication: better methods of debate, discussion and persuasion would let a public find itself.

One caution on the history. Schudson (2008) shows that the "Lippmann-Dewey debate" was largely constructed by later scholars, and that Lippmann wanted experts to inform elected representatives, not replace them.

The two answers still define the research programme. Lippmann's side predicts that ignorance is deep and cannot be aggregated away. Dewey's side predicts that the right structures of communication make publics competent. The rest of this explainer follows how each prediction has been tested.

## The evidence on voter knowledge

Survey research largely confirms Lippmann's picture of the individual voter. The live dispute is whether individual ignorance still matters once millions of votes are added up.

**Individual ignorance.** Converse (1964) coded open-ended interviews from US election surveys by how people reasoned about parties and candidates. Only 2.5% were "ideologues" using abstract principles, and another 9% were "near-ideologues". The largest group, 42%, judged politics by which social groups would benefit. Re-interviewing the same people across 1956 to 1960, he found many policy answers changed almost at random, which he called "non-attitudes".

**The aggregation rescue.** Page and Shapiro (1992) replied that random individual error cancels out in large numbers. Collective opinion, they showed, is stable and responds sensibly to events. This is the "miracle of aggregation", and its logic is the same as averaging noisy measurements.

**The rescue fails when errors are correlated.** Bartels (1996) estimated how each demographic group would vote if fully informed, across six US presidential elections from 1972 to 1992. Real outcomes diverged from the informed simulation: incumbents did about five points better and Democrats about two. Althaus (1998) found the same pattern in policy opinion. The uninformed are not a random sample and do not err randomly. Caplan (2007) adds that the public's economic beliefs differ from economists' in consistent directions.

**Shortcuts.** Lupia (1994) studied five competing insurance-reform propositions on the 1988 California ballot. Voters who knew few details but knew which side the insurance industry backed voted much like the well informed. A trusted cue can stand in for knowledge.

**The realist synthesis.** Achen and Bartels (2016) argue that voters mostly follow group identity and punish incumbents for recent events, including ones no government controls. Their best-known case is the vote swing against Woodrow Wilson in New Jersey beach towns after the 1916 shark attacks. That result is itself contested. Fowler and Hall (2018) examined every fatal US shark attack from 1872 to 2012 and found no systematic effect on elections, and Achen and Bartels (2018) defended their reading in reply. Cues, on the realist view, are only as good as the groups supplying them.

What this settles is that individual ignorance is real. What it leaves open is whether errors are independent enough for aggregation to work, and whether a process such as deliberation can do what aggregation cannot.

## The formal case for crowd wisdom

Three results carry the optimist case, and each buys its conclusion with a strong assumption.

### Condorcet's jury theorem

If each voter is independently right with probability above one half on a yes-or-no question, a majority is almost certainly right once the group is large (Condorcet 1785).

```latex
P_n = \sum_{k > n/2} \binom{n}{k} p^k (1-p)^{n-k} \longrightarrow 1 \quad \text{as } n \to \infty, \; p > \tfrac{1}{2}
```

The effect is strong. With individual accuracy of 51%, a majority of 1,000 voters is right about three times in four, and a majority of 10,000 about 98% of the time. The theorem needs three things: competence above chance, statistical independence between voters, and a binary choice. If competence falls below one half, the same maths makes large groups almost certainly wrong. List and Goodin (2001) extend the result to many options under plurality voting.

### The diversity prediction theorem

For numerical estimates, the crowd's squared error equals the average individual squared error minus the variance of the estimates (Page 2007).

```latex
(c - \theta)^2 = \frac{1}{n}\sum_{i=1}^{n}(s_i - \theta)^2 \; - \; \frac{1}{n}\sum_{i=1}^{n}(s_i - c)^2
```

Here the s values are individual estimates, c is their mean and theta is the truth. A crowd is therefore never worse than its average member, and it gains more the more its members disagree. This is the same identity as the ambiguity decomposition used for model ensembles in machine learning (Krogh and Vedelsby 1995). It is an accounting identity, so it does not say that adding diversity is free. Diversity helps only when it does not come at the price of much larger individual errors.

### Hong and Page: "diversity trumps ability"

Hong and Page (2004) model problem solving as search. Each agent has a personal heuristic for hunting through a landscape of candidate solutions. A group works in relay, each member improving on the current best until nobody can.

In their simulation the landscape was a ring of 2,000 points with random values. Each agent's heuristic was a set of three step sizes. Groups of 10 or 20 randomly chosen agents found better solutions than groups made of the 10 or 20 best individual performers. The best performers used similar heuristics, so they got stuck at the same local peaks.

The accompanying theorem states conditions under which a random group beats the best group with probability one. The problem must be hard enough that no agent always solves it. The pool must be diverse enough that someone can always improve on a non-optimal solution. The pool and the groups must be large.

Together these results suggest that sheer numbers, by bringing variety of perspective, can substitute for individual expertise. That inference is where the critics attack.

## Attacks on the formal case

The three results have different standings, and the critiques bear on them differently. Condorcet's theorem is valid mathematics with demanding assumptions. The diversity prediction theorem is an identity with limited causal content. Hong and Page is the contested one, both as a model and in its application to politics.

**Independence.** Voters read the same news, take the same cues and influence one another. Dietrich and Spiekermann (2013) replace Condorcet's independence with independence conditional on shared circumstances. Large-group accuracy then converges to the probability that the shared evidence points the right way, not to certainty. A crowd is capped by the quality of its common information, which is Lippmann's pseudo-environment in probabilistic form.

**Competence and bias.** The findings of Bartels, Althaus and Caplan undermine the assumption that voters' errors are unbiased. They do not show that individual accuracy is below one half. Their benchmark is how better-informed people would vote, and most political choices are not binary questions with an independently known right answer.

**Thompson's critique of Hong and Page.** Thompson (2014), a mathematician, made three charges. Once errors and needless technicalities are removed, the theorem roughly restates its own assumptions. The simulation is not connected to the theorem. And the "diverse" groups win because they are randomly drawn, not because they are diverse. She adds that variety of search heuristics has no shown link to diversity among real people.

**The defences.** Page (2015) replied that the model shows group performance depends on both ability and diversity, and that conditions can be written for either to win. Kuehn (2017) argues Thompson misreads how models are used in social science, while granting that randomisation matters. Singer (2019) reruns the model and finds that functional diversity, not randomness, explains the result.

**Sensitivity to the problem.** Grim et al. (2019) vary the landscape. On highly random landscapes diversity wins. On smoother ones, where skill on one part transfers to another, the best performers win. "Diversity trumps ability" is therefore a property of certain problem types.

**Romaniega's critique.** Romaniega (2023), in a preprint, argues the conclusion is built into the assumptions. He gives counterexamples when tailored hypotheses are dropped and proves a mirror-image "ability trumps diversity" theorem. He concludes that political arguments resting on the theorem are invalid.

None of this refutes the theorems. The lesson most of the literature draws is caution about carrying them into politics. Whether diversity beats ability on political questions is an empirical matter, and the theorems identify mechanisms worth testing.

## Landemore's synthesis and the epistocracy alternative

Landemore (2013) gives the fullest modern version of Dewey's reply: democracy is the smartest regime available because inclusion maximises cognitive diversity. Brennan (2016) reads the same evidence on voter ignorance and concludes the opposite, that the vote should be weighted towards the informed.

### Landemore's argument

1. Politics throws up novel problems, and nobody knows in advance which expertise will matter.
2. Under that uncertainty, variety of perspective matters more than individual ability. This step leans on Hong and Page.
3. The most reliable way to get variety is to include more people. She calls this "numbers trump ability".
4. Inclusive deliberation finds better options, and majority rule then aggregates what disagreement remains. This step leans on Condorcet and the diversity prediction theorem.

The psychological support comes from the argumentative theory of reasoning (Mercier and Sperber 2011). People reasoning alone mostly defend what they already believe, but they are good at judging other people's arguments. Reasoning therefore works best in groups that disagree (Mercier and Landemore 2012).

The institutional conclusion is sortition. In *Open Democracy* (Landemore 2020) and *Politics Without Politicians* (Landemore 2026) she argues for assemblies of citizens chosen by lottery, on the model of ancient Athens and modern citizens' assemblies.

### Brennan's argument

Brennan sorts citizens into "hobbits" (apathetic and uninformed), "hooligans" (informed but tribal) and "vulcans" (dispassionate and rational). He holds that almost all voters are one of the first two. He proposes experiments in epistocracy, such as voter qualification tests, extra votes for the knowledgeable, or statistically simulating what an informed public would choose.

Against Landemore directly, Brennan (2014) argues that the intelligence of democracy cannot be settled from theorems and has to be measured. Landemore (2014) replies in the same journal issue, and the two set out their cases side by side in Brennan and Landemore (2021).

### Objections to epistocracy

- **The demographic objection.** Political knowledge tracks wealth, education, sex and race, so a knowledge-weighted electorate would neglect the excluded (Estlund 2008). Ingham and Wiens (2021) generalise this. Any way of selecting the knowledgeable will correlate with other traits that bias outcomes, and design cannot remove that.
- **Power, not wisdom.** Bagg (2018) argues that democracy's main value is resisting capture by any narrow group, experts included. That value holds even if voters are poorly informed.
- **No shortcuts.** Lafont (2019) objects to epistocracy and lottery-based rule alike. Both ask most citizens to defer blindly to a few, whether experts or a random sample.

## The experiments

The experimental record supports a conditional view, and the studies do not all measure the same thing. Some test accuracy against a known answer or logical correctness. Others measure polarisation, agreement or belief change, which are not accuracy. The table lists the studies that carry most of the weight, oldest first.

| Study | Outcome measured | Question | Design | Finding |
| --- | --- | --- | --- | --- |
| Galton (1907) | Accuracy | Can a crowd estimate a quantity? | 787 fairgoers guessed the dressed weight of an ox | Median guess 1,207 lb against a true 1,198 lb |
| Moshman and Geil (1998) | Logical correctness | Do groups reason better than individuals? | Students tried Wason's four-card logic task alone or in small groups | About 9% solved it alone and about 75% in groups |
| Schkade, Sunstein and Hastie (2007) | Polarisation | What happens when the like-minded deliberate? | Colorado citizens from a liberal and a conservative city discussed three issues in like-minded groups | Groups moved to more extreme positions and became more uniform |
| Lorenz et al. (2011) | Accuracy and spread of estimates | Does seeing others' answers hurt? | 144 students revised factual estimates over five rounds, with or without seeing peers' answers | Seeing peers narrowed the spread of answers and raised confidence without improving accuracy |
| Mellers et al. (2014) | Forecast accuracy | What improves forecasting? | Multi-year geopolitical forecasting tournament with random assignment to training and teams | Training, teamwork and grouping the top performers each improved accuracy |
| [Becker, Brackbill and Centola (2017)](https://doi.org/10.1073/pnas.1615978114) | Accuracy | Does network shape matter? | Online groups of 40 revised estimates in decentralised or centralised networks, against independent controls | Decentralised networks became more accurate. Centralised ones rose or fell with the central person |
| [Navajas et al. (2018)](https://arxiv.org/abs/1703.00045) | Accuracy | Does deliberation beat aggregation? | 5,180 audience members answered alone, then agreed answers in groups of five | Averaging four group answers beat averaging thousands of individual answers |
| [Fishkin et al. (2021)](https://doi.org/10.1017/S0003055421000642) | Polarisation and opinion change | Does deliberation polarise or depolarise? | 523 representative US voters spent a long weekend on five issues with moderators, against a control group | Large depolarising shifts in policy views and less hostility to the other party |
| [Tessler et al. (2024)](https://doi.org/10.1126/science.adq2852) | Agreement | Can AI mediate a group? | 5,734 UK participants. A language model drafted group statements and revised them after critique | AI statements preferred to human mediators' 56% of the time. Groups ended less divided. Repeated with a representative sample of 200 |
| Costello, Pennycook and Rand (2024) | Belief change in individuals | Can AI dialogue correct false beliefs? | 2,190 conspiracy believers held a three-round conversation with a language model about their evidence | Belief fell by about 20%, lasting at least two months |

### What the pattern shows

**Independence is not sacred.** Lorenz et al. suggested any social influence damages crowd accuracy. Becker et al. and Navajas et al. show the damage depends on structure. Equal influence and small independent groups help. Hubs and open exposure to everyone's answers hurt.

**Composition and format decide the direction.** Like-minded groups left alone polarise, as in Colorado. Mixed groups with balanced briefings and moderators depolarise, as in Fishkin's experiment. The same activity, called "deliberation" in both cases, gives opposite results.

**Ability and diversity are complements.** The forecasting tournament improved accuracy by selecting good forecasters and by teaming them. Neither side of the Hong-Page dispute predicts that as cleanly as the data show it.

**Field cases match the laboratory.** Ireland's Citizens' Assembly of 99 randomly chosen citizens recommended repealing the constitutional ban on abortion, and the 2018 referendum agreed with 66.4% (Farrell, Suiter and Harris 2019). France's Citizens' Convention for Climate had 150 members and produced 149 proposals, of which the government adopted only part (Giraudet et al. 2022). Assemblies can reach considered positions. The weak point is their link to power.

### Limits of the evidence

- **Ground truth.** The accuracy experiments use questions with checkable answers, such as the height of the Eiffel Tower. Political questions mix facts with values and rarely have a known answer.
- **Agreement is not accuracy.** Fishkin and Tessler measure convergence and reduced hostility. A group can converge on a mistake.
- **Selection.** People who accept an invitation to deliberate for a weekend may differ from those who decline.
- **Durability and scale.** Most effects are measured days or weeks later, in groups of hundreds or thousands. Electorates run to millions.

## Prediction markets

Prediction markets are a third way of pooling judgement, alongside voting and deliberation. They forecast checkable events well, but the newest evidence says their accuracy comes from a skilled minority and not from the crowd.

### The idea

Traders buy and sell contracts that pay out if an event happens. A contract paying one dollar that trades at 62 cents is read as a 62% chance (Wolfers and Zitzewitz 2004). The intellectual root is Hayek (1945), who argued that prices gather knowledge scattered across many minds that no central body could collect.

A market differs from a vote in three ways. It weights each voice by money staked. It pays people for being right and charges them for being wrong. And it lets the uninformed stay out. It answers Lippmann's attention problem with an incentive to find out.

### The evidence

All five studies below measure forecast accuracy against outcomes that were later known.

| Study | Setting | Finding |
| --- | --- | --- |
| Rhode and Strumpf (2004) | Wall Street betting on US presidential elections, 1868 to 1940 | Betting odds were a good guide to results before scientific polling existed |
| [Berg, Nelson and Rietz (2008)](https://iemweb.biz.uiowa.edu/about-iem/research/prediction-market-accuracy-in-the-long-run/) | Iowa Electronic Markets against 964 polls over five US presidential elections | The market was closer to the result 74% of the time, with the biggest edge more than 100 days out |
| Dreber et al. (2015) | Psychologists bet on whether 44 published findings would replicate | Market prices called about 71% correctly, better than a survey of the same people |
| [Atanasov et al. (2017)](https://doi.org/10.1287/mnsc.2015.2374) | More than 2,400 forecasters randomly assigned to markets or forecasting polls on 261 geopolitical events | Markets beat the simple average of individual forecasts. Teams whose forecasts were weighted by track record beat markets |
| [Gómez-Cram et al. (2026)](https://dx.doi.org/10.2139/ssrn.6617059), working paper | Every trade on Polymarket, 2023 to 2025 | About 3% of accounts supply most of the accuracy. The rest supply volume and lose money to them |

### What this adds to the argument

**Aggregation without deliberation can work.** Markets beat polls at forecasting elections, which supports Hayek and the optimists on one narrow point. Dispersed knowledge can be pooled by a mechanism in which nobody talks to anybody.

**The accuracy comes from the few.** Gómez-Cram et al. find that the crowd provides liquidity while a small group of persistently skilled traders does the price discovery. A market is a selection device as much as an aggregation device. That sits closer to the "ability" side of the Hong and Page dispute than to the "diversity" side.

**Three lines of evidence now converge.** The forecasting tournaments, the performance-weighted teams in Atanasov et al. and the Polymarket data all point to the same design. Find the people who are reliably good, give them more weight, and keep a broad pool from which they can emerge.

**The price mechanism is not special.** In the one randomised comparison, deliberating teams with statistical weighting did better than a market. Markets and deliberation are alternative designs that can be tested against each other.

### Limits

- **Checkable questions only.** A market needs an event that settles. It can price who will win, and it cannot price what ought to be done.
- **Money-weighted voice.** Influence follows the size of the stake. This is the demographic objection to epistocracy in a sharper form.
- **Large traders.** Laboratory markets resisted manipulation because others traded against it (Hanson, Oprea and Porter 2006). Real markets can be thin. Rothschild and Sethi (2016) document one trader holding a large share of one side of a 2012 US election market.
- **Insider knowledge.** Insiders make prices more accurate and the market less fair. In April 2026 US authorities [indicted a soldier](https://www.espn.com/espn/betting/story/_/id/49019930/cftc-proposes-rules-limiting-prediction-markets-kalshi-sports) accused of trading on classified information about the timing of Nicolás Maduro's capture. The platforms [tightened their rules](https://www.venable.com/insights/publications/2026/04/kalshi-and-polymarket-move-to-curb-insider) in March 2026 and the US regulator has proposed its own.
- **Reflexivity.** Market prices are now reported as news. A price that shapes the beliefs it is meant to measure becomes part of the pseudo-environment.
- **Mostly sport.** Combined monthly volume on Kalshi and Polymarket rose from under 5 billion US dollars in September 2025 to 24 billion in April 2026. Sport has made up about 80% of Kalshi's volume since July 2024. Growth in trading is not growth in civic information.

### Futarchy

Hanson (2013) proposes to "vote on values, but bet on beliefs". Elected representatives would define a measure of national welfare. Markets would estimate which policies raise it, and the policies the markets favour would be adopted.

This is the cleanest institutional answer to the split between facts and values that runs through this explainer. It gives ends to democracy and means to markets. It is also Lippmann's expert bureau with the experts chosen by their own stakes.

The objections are practical. Prices conditional on a policy show correlation and not cause. Markets on long-run outcomes are thin. Those who gain from a policy may spend more moving the price than traders can earn correcting it. A US defence research plan for geopolitical markets was cancelled in 2003 after a political backlash, which shows legitimacy is its own constraint.

## Where the argument and the experiments are heading

The debate is moving from proving that crowds are wise or foolish to working out the conditions under which they are either. This section is a reading of the trend, not a settled result.

**From theorems to measurement.** After Thompson, Grim and Romaniega, few will rest a political argument on Hong and Page alone. The live question is which kinds of problem reward variety and which reward expertise. Expect more work that classifies political problems by type and tests each. Forecasting tournaments are the likely tool, because they give political questions a later, checkable answer.

**From verdicts to design variables.** The experiments point to a handful of settings that decide outcomes: group size, network shape, composition, facilitation and briefing material. Lippmann against Dewey is becoming an engineering question about how to set them.

**AI as the machinery of deliberation.** Deliberation works in groups of five to a few hundred, and Dewey's problem was always scale. Language models can summarise, translate and mediate across thousands of people. Tessler et al. (2024) is a proof of concept for AI-mediated agreement. It does not show that the positions reached are more accurate. Related lines include automated analysis of mass consultations (Small et al. 2023) and methods for drafting statements that provably represent a population (Fish et al. 2024). Landemore (2024) is optimistic that this brings deliberation to mass publics.

**The sceptical response.** Lazar and Manuali (2026) argue that language models should stay out of formal decision-making and be used to strengthen informal public discussion. Three risks are likely to drive the next round of experiments.

- **Steering.** A mediator that drafts the group's statement shapes it. Who sets its objective is a political question.
- **Correlated error.** If everyone consults the same few models, their mistakes line up. That is the common-cause problem of Dietrich and Spiekermann, and it lowers the ceiling on crowd accuracy.
- **The simulated public.** Models can imitate survey respondents (Argyle et al. 2023). That makes Brennan's idea of simulating an informed electorate technically cheap, and it would be Lippmann's expert bureau in automated form.

**The pseudo-environment, one level up.** Costello, Pennycook and Rand (2024) show that one-to-one AI dialogue can durably correct false beliefs. That is evidence about AI as an intermediary between a person and the facts, not about group deliberation. The same capacity could instil false beliefs. Lippmann's question of who checks the intermediary returns with a new intermediary.

**Standing institutions.** Sortition is moving from one-off assemblies to permanent bodies, such as the citizens' council in German-speaking Belgium (2019) and the Paris Citizens' Assembly (2021). The research questions shift accordingly: whether governments act on the outputs, whether non-participants trust them, and whether permanent bodies get captured. These are the tests of Lafont's objection.

**Markets as public information.** Prediction markets have moved from academic experiment to mass product, and regulators are now writing rules for them. The research questions are who supplies the accuracy, how much insiders matter, and whether published prices change the events they forecast. Language models already forecast at close to human-crowd accuracy on some question sets (Schoenegger et al. 2024), so part of the skilled minority may soon be machines.

### Open questions to watch

- Does deliberation improve accuracy on political questions with answers that can be checked later?
- Do depolarising effects last beyond a year?
- Does AI mediation change what groups conclude, or only how fast they converge?
- How much does shared reliance on AI sources raise the correlation of citizens' errors?

## Bibliography

Entries with links were checked against the linked page while writing. The rest are cited from memory, so confirm volume and page details before citing them formally.

- Achen, C. H. and Bartels, L. M. (2016). *Democracy for Realists: Why Elections Do Not Produce Responsive Government*. Princeton University Press.
- Achen, C. H. and Bartels, L. M. (2018). [Statistics as if politics mattered: a reply to Fowler and Hall](https://statmodeling.stat.columbia.edu/wp-content/uploads/2018/08/AchenBartelsResponse.pdf). *Journal of Politics* 80(4).
- Althaus, S. L. (1998). Information effects in collective preferences. *American Political Science Review* 92(3).
- Argyle, L. P., Busby, E. C., Fulda, N., Gubler, J. R., Rytting, C. and Wingate, D. (2023). Out of one, many: using language models to simulate human samples. *Political Analysis* 31(3).
- Atanasov, P., Rescober, P., Stone, E., Swift, S. A., Servan-Schreiber, E., Tetlock, P., Ungar, L. and Mellers, B. (2017). [Distilling the wisdom of crowds: prediction markets vs. prediction polls](https://doi.org/10.1287/mnsc.2015.2374). *Management Science* 63(3), 691-706.
- Bagg, S. (2018). The power of the multitude: answering epistemic challenges to democracy. *American Political Science Review* 112(4).
- Bartels, L. M. (1996). Uninformed votes: information effects in presidential elections. *American Journal of Political Science* 40(1).
- Becker, J., Brackbill, D. and Centola, D. (2017). [Network dynamics of social influence in the wisdom of crowds](https://doi.org/10.1073/pnas.1615978114). *PNAS* 114(26), E5070-E5076.
- Berg, J. E., Nelson, F. D. and Rietz, T. A. (2008). [Prediction market accuracy in the long run](https://iemweb.biz.uiowa.edu/about-iem/research/prediction-market-accuracy-in-the-long-run/). *International Journal of Forecasting* 24(2).
- Brennan, J. (2014). How smart is democracy? You can't answer that question a priori. *Critical Review* 26(1-2).
- Brennan, J. (2016). *Against Democracy*. Princeton University Press.
- Brennan, J. and Landemore, H. (2021). *Debating Democracy: Do We Need More or Less?* Oxford University Press.
- Caplan, B. (2007). *The Myth of the Rational Voter: Why Democracies Choose Bad Policies*. Princeton University Press.
- Condorcet, M. J. A. N. de (1785). *Essai sur l'application de l'analyse à la probabilité des décisions rendues à la pluralité des voix*. Paris.
- Converse, P. E. (1964). The nature of belief systems in mass publics. In D. Apter (ed.), *Ideology and Discontent*. Free Press.
- Costello, T. H., Pennycook, G. and Rand, D. G. (2024). Durably reducing conspiracy beliefs through dialogues with AI. *Science* 385.
- Dewey, J. (1927). *The Public and Its Problems*. Henry Holt.
- Dietrich, F. and Spiekermann, K. (2013). Epistemic democracy with defensible premises. *Economics and Philosophy* 29(1).
- Dreber, A. et al. (2015). Using prediction markets to estimate the reproducibility of scientific research. *PNAS* 112(50).
- Estlund, D. (2008). *Democratic Authority: A Philosophical Framework*. Princeton University Press.
- Farrell, D. M., Suiter, J. and Harris, C. (2019). "Systematizing" constitutional deliberation: the 2016-18 citizens' assembly in Ireland. *Irish Political Studies* 34(1).
- Fish, S., Gölz, P., Parkes, D. C., Procaccia, A. D., Rusak, G., Shapira, I. and Wüthrich, M. (2024). Generative social choice. *Proceedings of the 25th ACM Conference on Economics and Computation*.
- Fishkin, J., Siu, A., Diamond, L. and Bradburn, N. (2021). [Is deliberation an antidote to extreme partisan polarization? Reflections on "America in One Room"](https://doi.org/10.1017/S0003055421000642). *American Political Science Review* 115(4).
- Fowler, A. and Hall, A. B. (2018). [Do shark attacks influence presidential elections? Reassessing a prominent finding on voter competence](https://www.gsb.stanford.edu/faculty-research/publications/do-shark-attacks-influence-presidential-elections-reassessing). *Journal of Politics* 80(4).
- Galton, F. (1907). Vox populi. *Nature* 75.
- Giraudet, L.-G. et al. (2022). "Co-construction" in deliberative democracy: lessons from the French Citizens' Convention for Climate. *Humanities and Social Sciences Communications* 9.
- Gómez-Cram, R., Guo, Y., Jensen, T. I. and Kung, H. (2026). [Prediction market accuracy: crowd wisdom or informed minority?](https://dx.doi.org/10.2139/ssrn.6617059) SSRN working paper 6617059.
- Grim, P., Singer, D. J., Bramson, A., Holman, B., McGeehan, S. and Berger, W. J. (2019). [Diversity, ability, and expertise in epistemic communities](https://cambridge.org/core/journals/philosophy-of-science/article/diversity-ability-and-expertise-in-epistemic-communities/E679089194FE0FB848F597F3CD1F8A70). *Philosophy of Science* 86(1).
- Hanson, R. (2013). Shall we vote on values, but bet on beliefs? *Journal of Political Philosophy* 21(2).
- Hanson, R., Oprea, R. and Porter, D. (2006). Information aggregation and manipulation in an experimental market. *Journal of Economic Behavior & Organization* 60(4).
- Hayek, F. A. (1945). The use of knowledge in society. *American Economic Review* 35(4).
- Hong, L. and Page, S. E. (2004). Groups of diverse problem solvers can outperform groups of high-ability problem solvers. *PNAS* 101(46).
- Ingham, S. and Wiens, D. (2021). Demographic objections to epistocracy: a generalization. *Philosophy & Public Affairs* 49(4).
- Krogh, A. and Vedelsby, J. (1995). Neural network ensembles, cross validation, and active learning. *Advances in Neural Information Processing Systems* 7.
- Kuehn, D. (2017). Diversity, ability, and democracy: a note on Thompson's challenge to Hong and Page. *Critical Review* 29(1), 72-87.
- Lafont, C. (2019). *Democracy Without Shortcuts: A Participatory Conception of Deliberative Democracy*. Oxford University Press.
- Landemore, H. (2013). *Democratic Reason: Politics, Collective Intelligence, and the Rule of the Many*. Princeton University Press.
- Landemore, H. (2014). Yes, we can (make it up on volume): answers to critics. *Critical Review* 26(1-2), 184-237.
- Landemore, H. (2020). *Open Democracy: Reinventing Popular Rule for the Twenty-First Century*. Princeton University Press.
- Landemore, H. (2024). Can AI bring deliberation to the masses? In R. Chang and A. Srinivasan (eds.), *Conversations in Philosophy, Law, and Politics*. Oxford University Press.
- Landemore, H. (2026). [*Politics Without Politicians: The Case for Citizen Rule*](https://www.penguin.com.au/books/politics-without-politicians-9780241649169). Allen Lane (UK) and Thesis (US).
- Lazar, S. and Manuali, L. (2026). [Using LLMs to enhance democracy](https://link.springer.com/article/10.1007/s11023-026-09767-y). *Minds and Machines* 36, article 12.
- Lippmann, W. (1922). *Public Opinion*. Harcourt, Brace.
- Lippmann, W. (1925). *The Phantom Public*. Harcourt, Brace.
- Lippmann, W. and Merz, C. (1920). A test of the news. *The New Republic*, supplement, 4 August.
- List, C. and Goodin, R. E. (2001). Epistemic democracy: generalizing the Condorcet jury theorem. *Journal of Political Philosophy* 9(3).
- Lorenz, J., Rauhut, H., Schweitzer, F. and Helbing, D. (2011). How social influence can undermine the wisdom of crowd effect. *PNAS* 108(22).
- Lupia, A. (1994). Shortcuts versus encyclopedias: information and voting behavior in California insurance reform elections. *American Political Science Review* 88(1).
- Mellers, B. et al. (2014). Psychological strategies for winning a geopolitical forecasting tournament. *Psychological Science* 25(5).
- Mercier, H. and Landemore, H. (2012). Reasoning is for arguing: understanding the successes and failures of deliberation. *Political Psychology* 33(2).
- Mercier, H. and Sperber, D. (2011). Why do humans reason? Arguments for an argumentative theory. *Behavioral and Brain Sciences* 34(2).
- Moshman, D. and Geil, M. (1998). Collaborative reasoning: evidence for collective rationality. *Thinking & Reasoning* 4(3).
- Navajas, J., Niella, T., Garbulsky, G., Bahrami, B. and Sigman, M. (2018). [Aggregated knowledge from a small number of debates outperforms the wisdom of large crowds](https://arxiv.org/abs/1703.00045). *Nature Human Behaviour* 2, 126-132.
- Page, B. I. and Shapiro, R. Y. (1992). *The Rational Public: Fifty Years of Trends in Americans' Policy Preferences*. University of Chicago Press.
- Page, S. E. (2007). *The Difference: How the Power of Diversity Creates Better Groups, Firms, Schools, and Societies*. Princeton University Press.
- Page, S. E. (2015). Diversity trumps ability and the proper use of mathematics. *Notices of the AMS* 62(1), 9-10.
- Rhode, P. W. and Strumpf, K. S. (2004). Historical presidential betting markets. *Journal of Economic Perspectives* 18(2).
- Romaniega, Á. (2023). [Fatal errors and misuse of mathematics in the Hong-Page theorem and Landemore's epistemic argument](https://arxiv.org/pdf/2307.04709). arXiv preprint 2307.04709.
- Rothschild, D. and Sethi, R. (2016). Trading strategies and market microstructure: evidence from a prediction market. *Journal of Prediction Markets* 10(1).
- Schkade, D., Sunstein, C. R. and Hastie, R. (2007). What happened on Deliberation Day? *California Law Review* 95(3).
- Schoenegger, P., Tuminauskaite, I., Park, P. S., Bastos, R. V. S. and Tetlock, P. E. (2024). Wisdom of the silicon crowd: LLM ensemble prediction capabilities rival human crowd accuracy. *Science Advances* 10(45).
- Schudson, M. (2008). The "Lippmann-Dewey debate" and the invention of Walter Lippmann as an anti-democrat 1986-1996. *International Journal of Communication* 2.
- Singer, D. J. (2019). Diversity, not randomness, trumps ability. *Philosophy of Science* 86(1), 178-191.
- Small, C. T. et al. (2023). Opportunities and risks of LLMs for scalable deliberation with Polis. arXiv preprint.
- Tessler, M. H. et al. (2024). [AI can help humans find common ground in democratic deliberation](https://doi.org/10.1126/science.adq2852). *Science* 386, eadq2852.
- Thompson, A. (2014). [Does diversity trump ability? An example of the misuse of mathematics in the social sciences](http://www.ams.org/notices/201409/rnoti-p1024.pdf). *Notices of the AMS* 61(9), 1024-1030.
- Wolfers, J. and Zitzewitz, E. (2004). Prediction markets. *Journal of Economic Perspectives* 18(2).
