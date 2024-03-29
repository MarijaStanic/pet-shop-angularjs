package stanic.marija.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the customer database table.
 * 
 */
@Entity
@NamedQuery(name="Customer.findAll", query="SELECT c FROM Customer c")
public class Customer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String address;

	@Temporal(TemporalType.DATE)
	private Date birthdate;

	private String email;

	@Column(name="first_name")
	private String firstName;

	@Column(name="home_phone")
	private String homePhone;

	@Column(name="last_name")
	private String lastName;

	@Column(name="mobile_phone")
	private String mobilePhone;

	//bi-directional many-to-one association to Order
	@OneToMany(mappedBy="customer")
	@JsonIgnore
	private List<Order> orderrs;

	public Customer() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getBirthdate() {
		return this.birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getHomePhone() {
		return this.homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobilePhone() {
		return this.mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public List<Order> getOrderrs() {
		return this.orderrs;
	}

	public void setOrderrs(List<Order> orderrs) {
		this.orderrs = orderrs;
	}

	public Order addOrderr(Order orderr) {
		getOrderrs().add(orderr);
		orderr.setCustomer(this);

		return orderr;
	}

	public Order removeOrderr(Order orderr) {
		getOrderrs().remove(orderr);
		orderr.setCustomer(null);

		return orderr;
	}

}