import PlayerTeamApi from "../API/PlayerTeamApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "PLAYER_TEAM_GET",
	action: PlayerTeamApi.get.bind(PlayerTeamApi),
});