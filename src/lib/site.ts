// Single source of truth for site-wide details.
// Fill these in once names, date, and venue are confirmed.

export const site = {
	partnerOne: "Micah",
	partnerTwo: "Kinzi",

	weddingDate: "",
	weddingDateDisplay: "TBD",
	weddingTimeDisplay: "TBD",

	venueName: "TBD",
	venueAddress: "",
	venueMapsUrl: "",

	rsvpDeadline: "",
	rsvpDeadlineDisplay: "TBD",

	contactEmail: "thepoeticprison@gmail.com",
} as const;

export type Site = typeof site;
