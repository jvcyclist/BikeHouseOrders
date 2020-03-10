package pl.karas.bikehouseorders;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("pl.karas.bikehouseorders");

        noClasses()
            .that()
                .resideInAnyPackage("pl.karas.bikehouseorders.service..")
            .or()
                .resideInAnyPackage("pl.karas.bikehouseorders.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..pl.karas.bikehouseorders.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
