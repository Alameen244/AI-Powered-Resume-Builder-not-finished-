export function FormInput({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false,
  error = null,
  fullWidth = false,
}) {
  return (
    <div className={`input-field ${fullWidth ? 'input-field--full' : ''}`}>
      {label && (
        <label className="input-label">
          <span>{label}</span>
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        className={`input-control ${error ? 'has-error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
