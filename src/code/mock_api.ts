export interface IApplicant  {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: {
        statusType: StatusType;
        date: string;
        bid: (string | null);
    }
}

enum StatusType {
    Appointment_Set,
    Property_Viewed,
    Interested,
    Offer_Accepted
}

export const getApplicants: () => { applicants: IApplicant[]} = () => {
   
    return{
        applicants: [{
            firstName: "Ilia",
            lastName: "Valkov",
            email: "ilia@sample.com",
            phoneNumber: "+49 146 344 23811",
            status: {
                statusType: StatusType.Interested,
                date: "11 June 19:00",
                bid: null,
                }       
            },{
            firstName: "Maximillian",
            lastName: "Musterman",
            email: "maximillian@sample.com",
            phoneNumber: "+49 146 344 23811",
            status: {
                statusType: StatusType.Appointment_Set,
                date: "11 June 19:00",
                bid: null,
                }       
            },{
            firstName: "Bernhard",
            lastName: "Weiß",
            email: "bernhard@sample.com",
            phoneNumber: "+49 146 344 23811",
            status: {
                statusType: StatusType.Property_Viewed,
                date: "11 June 19:00",
                bid: "250.000",
                }       
            },{
            firstName: "Gottschalk",
            lastName: "Godeslack",
            email: "gottschalk@sample.com",
            phoneNumber: "+49 146 344 23811",
            status: {
                statusType: StatusType.Property_Viewed,
                date: "11 June 19:00",
                bid: "250.000",
                }       
            }
        ]
    }
}
