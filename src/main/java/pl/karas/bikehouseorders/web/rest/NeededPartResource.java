package pl.karas.bikehouseorders.web.rest;

import pl.karas.bikehouseorders.domain.NeededPart;
import pl.karas.bikehouseorders.repository.NeededPartRepository;
import pl.karas.bikehouseorders.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.karas.bikehouseorders.domain.NeededPart}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NeededPartResource {

    private final Logger log = LoggerFactory.getLogger(NeededPartResource.class);

    private static final String ENTITY_NAME = "neededPart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NeededPartRepository neededPartRepository;

    public NeededPartResource(NeededPartRepository neededPartRepository) {
        this.neededPartRepository = neededPartRepository;
    }

    /**
     * {@code POST  /needed-parts} : Create a new neededPart.
     *
     * @param neededPart the neededPart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new neededPart, or with status {@code 400 (Bad Request)} if the neededPart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/needed-parts")
    public ResponseEntity<NeededPart> createNeededPart(@Valid @RequestBody NeededPart neededPart) throws URISyntaxException {
        log.debug("REST request to save NeededPart : {}", neededPart);
        if (neededPart.getId() != null) {
            throw new BadRequestAlertException("A new neededPart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NeededPart result = neededPartRepository.save(neededPart);
        return ResponseEntity.created(new URI("/api/needed-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /needed-parts} : Updates an existing neededPart.
     *
     * @param neededPart the neededPart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated neededPart,
     * or with status {@code 400 (Bad Request)} if the neededPart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the neededPart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/needed-parts")
    public ResponseEntity<NeededPart> updateNeededPart(@Valid @RequestBody NeededPart neededPart) throws URISyntaxException {
        log.debug("REST request to update NeededPart : {}", neededPart);
        if (neededPart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NeededPart result = neededPartRepository.save(neededPart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, neededPart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /needed-parts} : get all the neededParts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of neededParts in body.
     */
    @GetMapping("/needed-parts")
    public ResponseEntity<List<NeededPart>> getAllNeededParts(Pageable pageable) {
        log.debug("REST request to get a page of NeededParts");
        Page<NeededPart> page = neededPartRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /needed-parts/:id} : get the "id" neededPart.
     *
     * @param id the id of the neededPart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the neededPart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/needed-parts/{id}")
    public ResponseEntity<NeededPart> getNeededPart(@PathVariable Long id) {
        log.debug("REST request to get NeededPart : {}", id);
        Optional<NeededPart> neededPart = neededPartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(neededPart);
    }

    /**
     * {@code DELETE  /needed-parts/:id} : delete the "id" neededPart.
     *
     * @param id the id of the neededPart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/needed-parts/{id}")
    public ResponseEntity<Void> deleteNeededPart(@PathVariable Long id) {
        log.debug("REST request to delete NeededPart : {}", id);
        neededPartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
