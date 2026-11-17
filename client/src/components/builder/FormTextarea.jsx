export function FormTextarea({
  label,
  placeholder = '',
  value = '',
  onChange,
  rows = 3,
  required = false,
  error = null,
  fullWidth = true,
}) {
  return (
    <div className={`input-field ${fullWidth ? 'input-field--full' : ''}`}>
      {label && (
        <label className="input-label">
          <span>{label}</span>
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        className={`input-control ${error ? 'has-error' : ''}`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
