import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';

const className = "PlayerTeam";

class PlayerTeam extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	static renderTeamExtra(team) {
		const hasPaidColor = team.has_paid ? 'green' : 'red';
		const isActiveColor = team.is_active ? 'green' : 'red';
		const isActiveIcon = team.is_active ? 'checkmark' : 'cancel';

		return (
			<React.Fragment>
				<Icon name={'dollar'} color={hasPaidColor} />
				<Icon name={isActiveIcon} color={isActiveColor} />
			</React.Fragment>
		);
	}

	render() {
		const { team } = this.props;

		return (
			<Card color={this.props.cardColor}>
				<Card.Content>
					<Image
						floated='right'
						circular
						size='mini'
						src={team.user_info.picture_url}
					/>
					<Card.Header>{team.team_name}</Card.Header>
					<Card.Description>{'Current Pick goes here?'}</Card.Description>
				</Card.Content>
				<Card.Content
					extra
				>
					{PlayerTeam.renderTeamExtra(team)}
				</Card.Content>
			</Card>
		);
	}
}

PlayerTeam.defaultProps = {
	cardColor: 'white'
};

PlayerTeam.propTypes = {
	team: PropTypes.object.isRequired,
	cardColor: PropTypes.string,
};

export default PlayerTeam;
