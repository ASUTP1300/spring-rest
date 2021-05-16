package home.springboot2;

import home.springboot2.web.DTO.UserDto;
import home.springboot2.web.model.Role;
import home.springboot2.web.model.User;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.Set;

@SpringBootTest
class SpringBoot2ApplicationTests {

	@Test
	void contextLoads() {

		ModelMapper modelMapper = new ModelMapper();
		Role role = new Role(1L,"ADMIN");

		Set<Role> roleSet = new HashSet<>();
		roleSet.add(role);
		User user = new User("ss","1", "2", roleSet);

		UserDto userDto = modelMapper.map(user, UserDto.class);

		System.out.println(userDto);
	}

}
