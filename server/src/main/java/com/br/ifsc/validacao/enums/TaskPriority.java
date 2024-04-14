package com.br.ifsc.validacao.enums;

import com.br.ifsc.validacao.http.exceptions.ApiGenericException;
import jakarta.persistence.AttributeConverter;
import lombok.Getter;

@Getter
public enum TaskPriority {
    URGENT("Urgent", (short) 3),
    HIGH("High", (short) 2),
    MEDIUM("Medium", (short) 1),
    LOW("Low", (short) 0);

    private final String label;
    private final short value;

    TaskPriority(String label, short value) {
        this.label = label;
        this.value = value;
    }

    public static TaskPriority fromValue(short value) {
        for (TaskPriority enumValue : TaskPriority.values()) {
            if (enumValue.getValue() == value) {
                return enumValue;
            }
        }
        throw new ApiGenericException("Invalid value for TaskPriority: " + value);
    }

    public static class TaskPriorityConverter implements AttributeConverter<TaskPriority, Short> {

        @Override
        public Short convertToDatabaseColumn(TaskPriority taskPriority) {
            return taskPriority != null ? taskPriority.getValue() : null;
        }

        @Override
        public TaskPriority convertToEntityAttribute(Short value) {
            return value != null ? TaskPriority.fromValue(value) : null;
        }
    }
}
