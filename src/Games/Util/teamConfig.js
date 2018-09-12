export function getTeamConfig(game, side) {
	const teamInfo = game[`${side}_team_info`];
	const teamName = teamInfo.nickname === '49ers' ? 'niners' : teamInfo.nickname;

	return {
		[side] :{
			displayName: teamInfo.full_name,
			teamName,
			nickName: teamInfo.nickname,
			color: teamColors[teamName.toLowerCase()],
			score: game[`${side}_team_score`],
			abbrev: teamInfo.abbreviation,
			logoPath: getLogoPath(teamInfo.nickname.toLowerCase()),
		}
	}
}

export function getLogoPath(team) {
	return `${process.env.PUBLIC_URL}/images/${team}.gif`;
}

export const teamColors = {
	cardinals: '97233F',
	falcons: 'A71930',
	ravens: '241773',
	bills: 'C60C30',
	panthers: '0085CA',
	bears: '0B162A',
	bengals: 'FB4F14',
	browns: '311D00',
	cowboys: '003594',
	broncos: 'FB4F14',
	lions: '0076B6',
	packers: '203731',
	texans: 'A71930',
	colts: 'A2AAAD',
	jaguars: '006778',
	chiefs: 'E31837',
	chargers: 'FFC20E',
	rams: '024',
	dolphins: '008E97',
	vikings: '4F2683',
	patriots: 'B0B7BC',
	saints: 'D3BC8D',
	giants: '0B2265',
	jets: '003F2D',
	raiders: 'A5ACAF',
	eagles: '004C54',
	steelers: 'A5ACAF',
	niners: 'AA0000',
	seahawks: '69BE28',
	buccaneers: 'D50A0A',
	titans: '4495D1',
	redskins: '773141',
};