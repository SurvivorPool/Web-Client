import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import { teamColors } from "../../Games/Util/teamConfig";

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
			<div className={`${className}__Pie__Container`}>
				<div className={`${className}__Pie`}>
					{"League Players"}
				</div>
				<PieChart width={250} height={400} onMouseEnter={this.onPieEnter}>
					<Pie
						data={statusData}
						dataKey={'value'}
						cx={120}
						cy={200}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						paddingAngle={5}
						label={true}
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

	renderLeaguePicksPie(leagueStats) {
		if(!leagueStats.previous_week_picks_current_league) {
			return null;
		}

		const picks = leagueStats.previous_week_picks_current_league;
		const pickData = picks.map(pick => {return { name: pick.team_name, value: pick.count}});

		return (
			<div className={`${className}__Pie__Container`}>
				<div className={`${className}__Pie`}>
					{"Last Week's"}
					<br />
					{"Picks"}
				</div>
				<PieChart width={250} height={400} onMouseEnter={this.onPieEnter}>
					<Pie
						data={pickData}
						dataKey={'value'}
						cx={120}
						cy={200}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						paddingAngle={5}
						label={true}
					>
						{
							pickData.map((entry, index) => <Cell key={entry} fill={`#${teamColors[entry.name.toLowerCase()]}`}/>)
						}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		)
	}

	renderAllPicksPie(leagueStats) {
		if(!leagueStats.previous_week_picks_all_leagues) {
			return null;
		}

		const picks = leagueStats.previous_week_picks_all_leagues;
		const pickData = picks.map(pick => {return { name: pick.team_name, value: pick.count}});

		return (
			<div className={`${className}__Pie__Container`}>
				<div className={`${className}__Pie`}>
					{"Last Week's"}
					<br />
					{"Picks (All)"}
				</div>
				<PieChart width={250} height={400} onMouseEnter={this.onPieEnter}>
					<Pie
						data={pickData}
						dataKey={'value'}
						cx={120}
						cy={200}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						paddingAngle={5}
						label={true}
					>
						{
							pickData.map((entry, index) => <Cell key={entry} fill={`#${teamColors[entry.name.toLowerCase()]}`}/>)
						}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		)
	}

	render() {
		const props = this.props;

		return (
			<div className={className}>
				{this.renderTeamStatusPie(props.leagueStats)}
				{this.renderLeaguePicksPie(props.leagueStats)}
				{this.renderAllPicksPie(props.leagueStats)}
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
