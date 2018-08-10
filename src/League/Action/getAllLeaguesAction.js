import LeagueApi from "../API/LeagueApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "LEAGUES_GET",
	action: LeagueApi.getAllLeagues.bind(LeagueApi),
});