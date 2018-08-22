import AdminApi from "../API/AdminApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_GAMES_POPULATE",
	action: AdminApi.populateGames.bind(AdminApi),
});