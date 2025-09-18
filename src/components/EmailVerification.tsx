/* eslint-disable @next/next/no-img-element */
interface EmailTemplateProps {
  url: string;
}

export default function EmailVerification({ url }: EmailTemplateProps) {
  return (
    <div>
      <img src="../../public/monanya-logo-black.png" width="100" height="30" alt="Monanya Logo" />
      <p>Halo, Selamat datang di Monanya!</p>
      <p>Klik tombol di bawah untuk aktifasi akun kamu:</p>
      <a
        href={url}
        style={{
          display: 'inline-block',
          backgroundColor: '#000',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Aktifasi Akun
      </a>
      <p>Tombol tidak berfungsi? Gunakan link berikut:</p>
      <a href={url}>{url}</a>
    </div>
  );
}
