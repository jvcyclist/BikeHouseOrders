package pl.karas.bikehouseorders.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import pl.karas.bikehouseorders.web.rest.TestUtil;

public class NeededPartTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NeededPart.class);
        NeededPart neededPart1 = new NeededPart();
        neededPart1.setId(1L);
        NeededPart neededPart2 = new NeededPart();
        neededPart2.setId(neededPart1.getId());
        assertThat(neededPart1).isEqualTo(neededPart2);
        neededPart2.setId(2L);
        assertThat(neededPart1).isNotEqualTo(neededPart2);
        neededPart1.setId(null);
        assertThat(neededPart1).isNotEqualTo(neededPart2);
    }
}
