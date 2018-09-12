import StatsApi from "../API/StatsApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "LEAGUE_STATS_GET",
	action: StatsApi.get.bind(StatsApi),
});