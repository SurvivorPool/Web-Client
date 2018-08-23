export function getTeamConfig(game, side) {
	const teamName = game[`${side}_team_name`] === '49ers' ? 'niners' : game[`${side}_team_name`];

	return {
		[side] :{
			displayName: game[`${side}_team_name`],
			teamName,
			color: teamColors[teamName],
			score: game[`${side}_team_score`],
			abbrev: game[`${side}_team_city_abbr`],
		}
	}
}

const teamColors = {
	cardinals: '97233F',
	falcons: 'A71930',
	ravens: '241773',
	bills: '00338D',
	panthers: '0085CA',
	bears: '0B162A',
	bengals: 'FB4F14',
	browns: '311D00',
	cowboys: '003594',
	broncos: 'FB4F14',
	lions: '0076B6',
	packers: '203731',
	texans: '03202F',
	colts: '002C5F',
	jaguars: '006778',
	chiefs: 'E31837',
	chargers: 'FFC20E',
	rams: '024',
	dolphins: '008E97',
	vikings: '4F2683',
	patriots: '002244',
	saints: 'D3BC8D',
	giants: '0B2265',
	jets: '003F2D',
	raiders: 'A5ACAF',
	eagles: '004C54',
	steelers: 'A5ACAF',
	niners: 'AA0000',
	seahawks: '002244',
	buccaneers: 'D50A0A',
	titans: '4495D1',
	redskins: '773141',
};