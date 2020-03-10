package pl.karas.bikehouseorders.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import pl.karas.bikehouseorders.domain.enumeration.Status;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Instant createdDate;

    @NotNull
    @Column(name = "bike_name", nullable = false)
    private String bikeName;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "comments")
    private String comments;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Order createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getBikeName() {
        return bikeName;
    }

    public Order bikeName(String bikeName) {
        this.bikeName = bikeName;
        return this;
    }

    public void setBikeName(String bikeName) {
        this.bikeName = bikeName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Order phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Order startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public String getComments() {
        return comments;
    }

    public Order comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Status getStatus() {
        return status;
    }

    public Order status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public Order user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", bikeName='" + getBikeName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", comments='" + getComments() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
