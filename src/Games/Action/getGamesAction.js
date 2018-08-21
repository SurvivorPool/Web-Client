import GamesApi from "../API/GamesApi";

import ActionCreator from "../../Common/Util/ActionCreator";

export default ActionCreator({
	name: "GAMES_GET",
	action: GamesApi.get.bind(GamesApi),
});