package com.pichincha.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    private Answer option1;

    @ManyToOne
    private Answer option2;

    @ManyToOne
    private Answer option3;

    @ManyToOne
    private Answer option4;

    @ManyToOne
    private Answer answer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Question text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Answer getOption1() {
        return option1;
    }

    public Question option1(Answer answer) {
        this.option1 = answer;
        return this;
    }

    public void setOption1(Answer answer) {
        this.option1 = answer;
    }

    public Answer getOption2() {
        return option2;
    }

    public Question option2(Answer answer) {
        this.option2 = answer;
        return this;
    }

    public void setOption2(Answer answer) {
        this.option2 = answer;
    }

    public Answer getOption3() {
        return option3;
    }

    public Question option3(Answer answer) {
        this.option3 = answer;
        return this;
    }

    public void setOption3(Answer answer) {
        this.option3 = answer;
    }

    public Answer getOption4() {
        return option4;
    }

    public Question option4(Answer answer) {
        this.option4 = answer;
        return this;
    }

    public void setOption4(Answer answer) {
        this.option4 = answer;
    }

    public Answer getAnswer() {
        return answer;
    }

    public Question answer(Answer answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
