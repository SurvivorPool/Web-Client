import LeagueApi from "../API/LeagueApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "LEAGUE_UPDATE",
	action: LeagueApi.update.bind(LeagueApi),
});