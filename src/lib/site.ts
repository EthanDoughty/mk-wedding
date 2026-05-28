// Single source of truth for site-wide details.
// Fill these in once names, date, and venue are confirmed.

export const site = {
	partnerOne: "Micah",
	partnerTwo: "Kinzi",
	hashtag: "#MKWedding",

	weddingDate: "2027-06-12T16:00:00-04:00",
	weddingDateDisplay: "Saturday, June 12, 2027",
	weddingTimeDisplay: "4:00 PM",

	venueName: "The Venue (TBD)",
	venueAddress: "123 Somewhere Lane, Town, ST",
	venueMapsUrl: "https://maps.google.com/?q=The+Venue",

	rsvpDeadline: "2027-05-01",
	rsvpDeadlineDisplay: "May 1, 2027",

	contactEmail: "thepoeticprison@gmail.com",
} as const;

export type Site = typeof site;
