import PlayerTeamApi from "../API/PlayerTeamApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_PLAYER_TEAM_GET_ALL",
	action: PlayerTeamApi.adminGetAll.bind(PlayerTeamApi),
});