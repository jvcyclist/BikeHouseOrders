package pl.karas.bikehouseorders.web.rest;

import pl.karas.bikehouseorders.BikehouseordersApp;
import pl.karas.bikehouseorders.domain.NeededPart;
import pl.karas.bikehouseorders.repository.NeededPartRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NeededPartResource} REST controller.
 */
@SpringBootTest(classes = BikehouseordersApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NeededPartResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private NeededPartRepository neededPartRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNeededPartMockMvc;

    private NeededPart neededPart;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NeededPart createEntity(EntityManager em) {
        NeededPart neededPart = new NeededPart()
            .name(DEFAULT_NAME);
        return neededPart;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NeededPart createUpdatedEntity(EntityManager em) {
        NeededPart neededPart = new NeededPart()
            .name(UPDATED_NAME);
        return neededPart;
    }

    @BeforeEach
    public void initTest() {
        neededPart = createEntity(em);
    }

    @Test
    @Transactional
    public void createNeededPart() throws Exception {
        int databaseSizeBeforeCreate = neededPartRepository.findAll().size();

        // Create the NeededPart
        restNeededPartMockMvc.perform(post("/api/needed-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neededPart)))
            .andExpect(status().isCreated());

        // Validate the NeededPart in the database
        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeCreate + 1);
        NeededPart testNeededPart = neededPartList.get(neededPartList.size() - 1);
        assertThat(testNeededPart.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createNeededPartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = neededPartRepository.findAll().size();

        // Create the NeededPart with an existing ID
        neededPart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNeededPartMockMvc.perform(post("/api/needed-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neededPart)))
            .andExpect(status().isBadRequest());

        // Validate the NeededPart in the database
        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = neededPartRepository.findAll().size();
        // set the field null
        neededPart.setName(null);

        // Create the NeededPart, which fails.

        restNeededPartMockMvc.perform(post("/api/needed-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neededPart)))
            .andExpect(status().isBadRequest());

        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNeededParts() throws Exception {
        // Initialize the database
        neededPartRepository.saveAndFlush(neededPart);

        // Get all the neededPartList
        restNeededPartMockMvc.perform(get("/api/needed-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(neededPart.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getNeededPart() throws Exception {
        // Initialize the database
        neededPartRepository.saveAndFlush(neededPart);

        // Get the neededPart
        restNeededPartMockMvc.perform(get("/api/needed-parts/{id}", neededPart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(neededPart.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingNeededPart() throws Exception {
        // Get the neededPart
        restNeededPartMockMvc.perform(get("/api/needed-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNeededPart() throws Exception {
        // Initialize the database
        neededPartRepository.saveAndFlush(neededPart);

        int databaseSizeBeforeUpdate = neededPartRepository.findAll().size();

        // Update the neededPart
        NeededPart updatedNeededPart = neededPartRepository.findById(neededPart.getId()).get();
        // Disconnect from session so that the updates on updatedNeededPart are not directly saved in db
        em.detach(updatedNeededPart);
        updatedNeededPart
            .name(UPDATED_NAME);

        restNeededPartMockMvc.perform(put("/api/needed-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNeededPart)))
            .andExpect(status().isOk());

        // Validate the NeededPart in the database
        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeUpdate);
        NeededPart testNeededPart = neededPartList.get(neededPartList.size() - 1);
        assertThat(testNeededPart.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingNeededPart() throws Exception {
        int databaseSizeBeforeUpdate = neededPartRepository.findAll().size();

        // Create the NeededPart

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNeededPartMockMvc.perform(put("/api/needed-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(neededPart)))
            .andExpect(status().isBadRequest());

        // Validate the NeededPart in the database
        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNeededPart() throws Exception {
        // Initialize the database
        neededPartRepository.saveAndFlush(neededPart);

        int databaseSizeBeforeDelete = neededPartRepository.findAll().size();

        // Delete the neededPart
        restNeededPartMockMvc.perform(delete("/api/needed-parts/{id}", neededPart.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NeededPart> neededPartList = neededPartRepository.findAll();
        assertThat(neededPartList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
