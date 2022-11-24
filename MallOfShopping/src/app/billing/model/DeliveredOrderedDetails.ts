import {UserDetailsModel} from "../../user-details/model/user.details.model";
import {Order} from "../../individual-grocery/model/Order";

export class DeliveredOrderedDetails {
  constructor(
    public userDetailsModel: UserDetailsModel ,
    public order: Order[]
  ) {
  }
}
