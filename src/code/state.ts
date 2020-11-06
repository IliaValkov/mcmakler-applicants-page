import React from "react";
import * as API from "./mock_api";

/**
 * Function to create a state object
 * 
 * @param inParentComponent The component that will contain the app state
 * @returns [Object] Object containing all state fields and methods
 */
export function createState(inParentComponent: React.Component) {
	return {
		// Flag: Is the loading message visible?
		pageLoading: false,

		// Is the page showing search results?
		searchView: false,

		// An object with lists containing all applicants
		all: {
			// List of applicants that have an appointment
			appointment: [],
	
			// List of applicants that have viewed the property
			viewed: [],
	
			// List of applicants that are interested
			interested: [],
	
			// List of applicants that have accpeted the offer
			offerAccepted: [],
		},

		// An object with lists containing all search results
		search: {
			// List of applicants that have an appointment
			appointment: [],
	
			// List of applicants that have viewed the property
			viewed: [],
	
			// List of applicants that are interested
			interested: [],
	
			// List of applicants that have accpeted the offer
			offerAccepted: [],
		},

		// List of applicants statistics
		applicantsStatistics: {
			total: "0",
            new: "0",
            viewed: "0",
            appointment: "0",
            other: "0",
		},

		// The current value of the search box
		searchQuery: <string>"",

		/**
		 * Shows or hides loading message
		 *
		 *  @param inVisible  True for shown, false for hidden
		 */
		showLoading: function (inVisible: boolean): void {
			this.setState({ pageLoading: inVisible });
		}.bind(inParentComponent),

		/**
		 * Get applicants with mock API call
		 * This function utilize the filteredList Promise and concurently filters the 
		 * recieved applicant list for each status type. This function calls handleSearch
		 * upon updating the applicants list, in order to filter them according to the 
		 * search query, in the case of one received from the page url.
		 */
		getApplicants: async function (): Promise<void> {
			const allApplicants = API.getApplicants().applicants;
			
			// Filter the  received list concurently
			const [appointment,viewed,interested,offerAccepted] = await Promise.all(
				[this.state.filteredList(allApplicants,API.StatusType.Appointment_Set),
				this.state.filteredList(allApplicants,API.StatusType.Property_Viewed),
				this.state.filteredList(allApplicants,API.StatusType.Interested),
				this.state.filteredList(allApplicants,API.StatusType.Offer_Accepted)]
			);

			this.setState({
				all: {
					appointment: appointment,
					viewed: viewed,
					interested: interested,
					offerAccepted: offerAccepted, 
				} 
			}, () => this.state.handleSearch(null));

		}.bind(inParentComponent),

		/**
		 * Promise for a filtered IApplicant list.
		 * 
		 * @param list   The list to be filtered
		 * @param filter The status type to be filtered
		 */
		filteredList: function (list: API.IApplicant[], filter: API.StatusType): Promise<API.IApplicant[]> {
			return new Promise ((inResolve, inReject)=>{
				try {
					const result = list.filter( applicant => applicant.status.statusType === filter);
					if(result.length === 0 ) {
						inResolve([]);
					}
					inResolve(result);
				} catch (Error) {
					inReject(Error);
				}
			})
		}.bind(inParentComponent),
		
		/**
		 * Get applicants stats with mock API call
		 */
		getStats: function (): void {
			const response = API.getStatistics();
			this.setState({ applicantsStatistics: response.data });
		}.bind(inParentComponent),

		/**
		 * Generic user input handler
		 *
		 * @param event The event object passed by React
		 */
		handleChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
			event.preventDefault();
			
			const sq = event.target.value;
			if(sq.trim() === "") {
				// window.history.replaceState(null,"", window.location.pathname);
				this.state.clearSearchResults();
			}

			this.setState({
				[event.target.name]: sq,
			});
			
		}.bind(inParentComponent),

		/**
		 * Perform concurent search on all applicant list based on applicants first
		 * name, last name and email. Updates the url according to the given search 
		 * query
		 * 
		 * @param event Either a React event object holding information about the
		 * SearchBox input value or null for performing a search on page load if 
		 * the page url has a search parameter specified
		 */
		handleSearch: async function (event: React.FormEvent<HTMLFormElement> | null) {
			if(event) event.preventDefault();
   
			if(this.state.searchQuery !== "") {
				const [appointment,viewed,interested,offerAccepted] = await Promise.all(
					[this.state.searchListForApplicant(this.state.all.appointment),
					this.state.searchListForApplicant(this.state.all.viewed),
					this.state.searchListForApplicant(this.state.all.interested),
					this.state.searchListForApplicant(this.state.all.offerAccepted)]
				);
				
				this.setState({ 
					searchView: true,
					search: {
						appointment: appointment,
						viewed: viewed,
						interested: interested,
						offerAccepted: offerAccepted, 
					}
				});
	
				this.state.updateURLSearchParam();
			}
		}.bind(inParentComponent),

		/**
		 * Searches a given list based on the searchQuery field
		 * 
		 * @param list The list to be searched
		 * @returns Promise<IApplicant[]> A promise object that resolves in a
		 * list of IApplicant objects.   
		 */
		searchListForApplicant: function(list: API.IApplicant[]): Promise<API.IApplicant[]> {
			return new Promise((inResolve, inReject)=>{
				try {
					const sq = <string> this.state.searchQuery.toLowerCase();
					const result = list.filter( applicant => {
							const fullName = applicant.firstName + applicant.lastName;
								// remove the white space from the search Query to match
								//  both first and last name if both given by the user
								return fullName.toLowerCase().includes(sq.split(/\s/).join("")) ||
								applicant.email.toLowerCase().includes(sq); 
							});
							if(result.length === 0 ) {
								inResolve([]);
							}
							inResolve(result);
					
				} catch (Error) {
					inReject(Error);
				}
			});
		}.bind(inParentComponent),


		/**
		 * CLears the result arrays
		 * 
		 */
		clearSearchResults: function () {
			this.state.deleteSearchParam();
			this.setState({ 
				searchView: false,
				search: {
					appointment: [],
					viewed: [],
					interested: [],
					offerAccepted: [], 
				}
			});
		}.bind(inParentComponent),

		/**
		 * Updates the search parameter of the page url 
		 * 
		 */
		updateURLSearchParam: function () {
			const searchParam = new URLSearchParams(window.location.search);
			searchParam.set("search", this.state.searchQuery.toLowerCase());
			window.history.pushState(null,"", `?${searchParam.toString()}` );
		}.bind(inParentComponent),


		/**
		 * Removes the search parameter from the page url
		 * 
		 */
		deleteSearchParam: function () {
			const currentURL = new URL(window.location.href);
			currentURL.searchParams.delete("search")
			window.history.pushState(null,"", currentURL.href );
		}.bind(inParentComponent)
	};
}