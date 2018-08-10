import LeagueApi from "../API/LeagueApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "LEAGUE_GET_BY_USER",
	action: LeagueApi.getByUser.bind(LeagueApi),
});