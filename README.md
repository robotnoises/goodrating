# goodrating

> An attempt to rate college football teams (good).

## Consumer Warning - this is supposed to be fun

I enjoy college football and I enjoy lists. This rating system is, more than anything else, for my own enjoyment. Much of the "information" presented here is anecdotal, at best. That's intentional. Football is simulated warfare + shoulder pads. Any attempt to *seriously* quantify it should be met with tremendous skepticism.

## Summary

*goodrating* is an attempt to rate college football teams using the fewest number of statistics as possible. Like people, statistics have biases. In limiting the number of statistical factors, I hope to control the effect of their bias.

> But... how can a number be biased?

It's all about context. E.g. a team can have a 0.950 winning percentage, but that number doesn't account for the quality of teams they played in achieving that number. A high winning percentage could be an indicator of greatness, but it could also be an indicator of their opponents' collective weakness.

> Ok, what are you going to do about it then?

Glad you asked!

Here are the four main pillars of goodrating:

1. Winning percentage
2. Offense rating
3. Defense rating
4. Player rating

#### Winning percentage

A lot of rating systems will adjust a team's winning percentage based on their "strength of schedule (SOS)," i.e. *how good were the teams they played?* I don't like using SOS, though, because although it rewards successful teams that play difficult schedules, it also tends to reward bad teams that play difficult schedules. Instead, I plan on adjusting based on the team's cumulative performance versus expectation, aka "the spread." If a team wins a lot of games, but not as convincingly as they should, they are adjusted down. If a team has an average record, but a lot of close losses, they are adjusted up, and so on.

#### Offense rating

For now, this is purely a team's average yards per play. There is a wide variety of offensive styles in the NCAA, but all of them have the same goal: gain as many yards as they can and score points.

#### Defense rating

Much like the `Offense rating`, this is the team's average yards allowed per play.

#### Player rating

This is the team's combined recruiting scores during the previous four years, as provided by [247 Sports' Composite Rankings](http://247sports.com/Season/2017-Football/CompositeTeamRankings). Although the scores are entirely based on projections, there is a strong correlation between recruiting well and winning football games. See the recent SBNation article [The 2016 Blue-Chip Ratio: How close is your CFB team to having title-level talent?](http://www.sbnation.com/college-football-recruiting/2016/8/18/12530108/ncaa-football-best-recruiters-2016) for more explanation on that. (Spoiler: Alabama gets good players)

> What about teams that play each other?

Good observation! We don't track specific game outcomes. That's because head-to-head results don't matter in this rating. This is an attempt to quantify the "goodness" of team, not a predictor of game outcomes. Therefore, it is possible that a team will be rated above a team that beat them. Sorry.

## Methodology

Each statistical category, is normalized to a 100-point scale. For example, if the best winning percentage in all of football is `0.9`, then that team gets a score of `100`. After each score is calculated, we apply some weights. Here's how the weights are currently distributed:

1. Winning percentage -> 45%
2. Offense rating -> 15%
3. Defense rating -> 20%
4. Player rating -> 20%
 
After that, we simply add the four scores and rank accordingly, high-to-low.

Currently, the cumulative "against the spread" score is applied directly to the final score, but I'm still evaluating the effect that has.

## Last Warning

Just like any statistics-driven system, the rating will (theoretically) improve as the sample size increases. This means that there is a strong possibility that the ratings will be less-than-accurate during the first few weeks. Please be patient (also, see the note about this being for fun at the top).

## Finally

If you have any questions/comments please feel free to open an Issue or email me at davenich [at] gmail.
