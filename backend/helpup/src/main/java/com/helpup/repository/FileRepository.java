package com.helpup.repository;

import com.helpup.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByCategory(String category);

    List<File> findByCategoryOrderByUploadDateDesc(String category);
}