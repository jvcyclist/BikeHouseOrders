package pl.karas.bikehouseorders.repository;

import pl.karas.bikehouseorders.domain.NeededPart;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NeededPart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NeededPartRepository extends JpaRepository<NeededPart, Long> {
}
