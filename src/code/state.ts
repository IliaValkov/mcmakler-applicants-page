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

		// List of applicants
		appointment: [],
		viewed: [],
		interested: [],
		offerAccepted: [],

		// List of applicants statistics
		applicantsStatistics: {
			total: "0",
            new: "0",
            viewed: "0",
            appointment: "0",
            other: "0",
		},

		// The current value of the search box
		searchQuery: "",

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
		 */
		getApplicants: async function (): Promise<void> {
			const allApplicants = API.getApplicants().applicants;
			
			const [appointment,viewed,interested,offerAccepted] = await Promise.all(
				[this.state.filteredList(allApplicants,API.StatusType.Appointment_Set),
				this.state.filteredList(allApplicants,API.StatusType.Property_Viewed),
				this.state.filteredList(allApplicants,API.StatusType.Interested),
				this.state.filteredList(allApplicants,API.StatusType.Offer_Accepted)]
			);

			this.setState({ 
				appointment: appointment,
				viewed: viewed,
				interested: interested,
				offerAccepted: offerAccepted, 
			});

		}.bind(inParentComponent),

		filteredList: function (list: API.IApplicant[], filter: API.StatusType): Promise<API.IApplicant[]> {
			return new Promise ((inResolve, inReject)=>{
				try {
					console.log(filter.valueOf());
					if(list !== null) {
						const result = list.filter( applicant => applicant.status.statusType === filter);
						inResolve(result);
					} else {
						inResolve([]);
					}
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
			this.setState({
				[event.target.name]: event.target.value,
			});
		}.bind(inParentComponent),
	};
}
