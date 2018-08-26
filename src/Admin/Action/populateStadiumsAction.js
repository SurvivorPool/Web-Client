import AdminApi from "../API/AdminApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_STADIUMS_POPULATE",
	action: AdminApi.populateStadiums.bind(AdminApi),
});