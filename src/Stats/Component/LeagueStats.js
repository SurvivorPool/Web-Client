import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const className = "LeagueStats";

class LeagueStats extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	renderTeamStatusPie(leagueStats) {
		if(!leagueStats.league_stats) {
			return null;
		}

		const status = leagueStats.league_stats;
		const statusData = [
			{name: 'Active', value: status.active},
			{name: 'Sunk', value: status.inactive},
		];
		const colors = ['#FDC37B', '#8799CE'];

		return (
			<div className={`${className}__StatusPie__Container`}>
				<div className={`${className}__StatusPie`}>
					{"League Players"}
				</div>
				<PieChart width={250} height={300} onMouseEnter={this.onPieEnter}>
					<Pie
						data={statusData}
						dataKey={'value'}
						cx={120}
						cy={200}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						paddingAngle={5}
						label
					>
						{
							statusData.map((entry, index) => <Cell key={entry} fill={colors[index % colors.length]}/>)
						}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		);
	}

	render() {
		const props = this.props;

		return (
			<div className={className}>
				{this.renderTeamStatusPie(props.leagueStats)}
			</div>
		);
	}
}

LeagueStats.defaultProps = {
	leagueStats: {}
};

LeagueStats.propTypes = {
	leagueStats: PropTypes.object,
};

export default LeagueStats;
