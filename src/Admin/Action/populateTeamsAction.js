import AdminApi from "../API/AdminApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_TEAMS_POPULATE",
	action: AdminApi.populateTeams.bind(AdminApi),
});