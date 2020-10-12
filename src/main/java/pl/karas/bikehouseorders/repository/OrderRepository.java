package pl.karas.bikehouseorders.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.DefaultParameters;
import org.springframework.web.bind.annotation.PathVariable;
import pl.karas.bikehouseorders.domain.Order;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select order from Order order where order.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

   // @Query("select order from Order order where order.status = :status")
    Page<Order> findByStatus(Pageable peagable, String status);

}
