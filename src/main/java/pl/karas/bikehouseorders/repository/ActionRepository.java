package pl.karas.bikehouseorders.repository;

import pl.karas.bikehouseorders.domain.Action;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Action entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {
}
