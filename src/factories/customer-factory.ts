import { db } from "../data/db/init";
import { CustomerRepositoryDb } from "../data/repository/customer.repository";
import { Customer } from "../presentation/controllers/customer/customer.controller";
import { CustomerService } from "../services/customer.service";

export default function makeCustomerController() {
  const repository = new CustomerRepositoryDb(db);
  const service = new CustomerService(repository);
  return new Customer(service);
}