import AdminApi from "../API/AdminApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "ADMIN_ADVANCE_WEEK",
	action: AdminApi.advanceWeek.bind(AdminApi),
});