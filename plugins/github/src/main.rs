use std::collections::HashMap;

// Import dependencies
use takoyaki::{Takoyaki, Powerup, Cache, PluginConfig, State, reqwest, PrintableGrid, Printable};

// Types 
use serde::{Deserialize , Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Root {
    pub data: Data,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data {
    pub user: User,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub name: String,
    pub contributions_collection: ContributionsCollection,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ContributionsCollection {
    pub contribution_calendar: ContributionCalendar,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ContributionCalendar {
    pub colors: Vec<String>,
    pub total_contributions: i64,
    pub weeks: Vec<Week>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Week {
    pub contribution_days: Vec<ContributionDay>,
    pub first_day: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ContributionDay {
    pub color: String,
    pub contribution_count: usize,
    pub date: String,
    pub weekday: i64,
}


// Plugin
pub struct GitHub {

}

impl Powerup<Root> for GitHub {
    fn new() -> Self {
        Self {

        }
    }

    fn ready(&self, cache: Cache, config: PluginConfig) -> State {
        let mut body = HashMap::new();

        body.insert("query", format!(r#"query {{
            user(login: "{}") {{
                name
                contributionsCollection {{
                    contributionCalendar {{
                        colors
                        totalContributions
                        weeks {{
                            contributionDays {{
                                color
                                contributionCount
                                date
                                weekday
                            }}
                            firstDay
                        }}
                    }}
                }}
            }}
        }}"# , "ThePrimeagen"));

        State::from_reqwest(
            reqwest::Client::new()
                .post("https://api.github.com/graphql")
                .header("Authorization", format!("Bearer {}" , ""))
                .json(&body)
        )
    }

    fn evolve(&self, data: Root) -> PrintableGrid {
        let mut grid = PrintableGrid::new();

        let mut x = 0;
        let mut y = 0;

        for week in data.data.user.contributions_collection.contribution_calendar.weeks {
            for day in week.contribution_days {
                grid.insert_at(x, y, Printable { color: day.color , count: day.contribution_count } );

                x += 1;
            }

            x = 0;
            y += 1;
        };

        grid
    }
}

#[tokio::main]
async fn main() {
    let takoyaki = Takoyaki::with_powerup("github", Box::new(GitHub::new()));

    takoyaki.start().await;
}
