import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import {
  query,
  userDetails,
  week,
  contributionCount,
} from "../@types/interfaces";
import { fetchContribution, fetcher, gqlQuery } from "../@types";

const handler = async (_: VercelRequest, res: VercelResponse) => {
  const data = await fetchContributions("manishprivet", graphqlQuery, fetch);
  res.status(200).json(data);
};

//GraphQl query to get everyday contributions as a response
export const graphqlQuery: gqlQuery = (username: string) => {
  return {
    query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
         name
         contributionsCollection {
           contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      },
    `,
    variables: {
      LOGIN: username,
    },
  };
};

const token: string | undefined = process.env.GITHUB_ACCESS_TOKEN;

const headers = {
  Authorization: `bearer ${token}`,
};

//Fetching data from GitHub GraphQl API
const fetch: fetcher = (data: query) =>
  axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    headers,
    data,
  });

const fetchContributions: fetchContribution = async (
  username: string,
  graphqlQuery: gqlQuery, //Dependency Injection
  fetch: fetcher
) => {
  try {
    const apiResponse = await fetch(graphqlQuery(username));
    if (apiResponse.data.data.user === null)
      return `Can't fetch any contribution. Please check your username 😬`;
    else {
      let userData: userDetails = {
        totalContributions:
          apiResponse.data.data.user.contributionsCollection
            .contributionCalendar.totalContributions,
        contributions: [],
        name: apiResponse.data.data.user.name,
      };
      //filtering the week data from API response
      const weeks: week[] =
        apiResponse.data.data.user.contributionsCollection.contributionCalendar
          .weeks;
      //slicing last 6 weeks
      weeks
        .slice(weeks.length - 6, weeks.length)
        .map((week: week) =>
          week.contributionDays.map((contributionCount: contributionCount) =>
            userData.contributions.push(contributionCount.contributionCount)
          )
        );

      //returning data of last 31 days
      const presentDay = new Date().getDay();
      userData.contributions = userData.contributions.slice(
        5 + presentDay,
        36 + presentDay
      );
      return userData;
    }
  } catch (error) {
    return error;
  }
};

export default handler;
