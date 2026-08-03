export type DashboardEvent = {
	id: number;
	title: string;
	date: string;
	time: string;
	location: string;
	createdBy: string;
	avatarUrl?: string | null;
};

export const events: DashboardEvent[] = [
	{
		id: 1,
		title: "Family Dinner",
		date: "2026-08-05",
		time: "18:00",
		location: "Home",
		createdBy: "Ayomide",
	},
	{
		id: 2,
		title: "Doctor's Appointment",
		date: "2026-08-10",
		time: "09:30",
		location: "Olowu Clinic",
		createdBy: "Ayomide",
	},
];
