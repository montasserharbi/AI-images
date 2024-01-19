const api = "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";
const inp = document.getElementById('inp');
const images = document.querySelector('.images');
const loadingSpinner = document.getElementById('loading-spinner');
const generateBtn = document.getElementById('generateBtn');

const showLoadingSpinner = () => {
  loadingSpinner.style.display = 'block';
}

const hideLoadingSpinner = () => {
  loadingSpinner.style.display = 'none';
}

const showGenerateButton = () => {
  generateBtn.classList.remove('processing');
}

const hideGenerateButton = () => {
  generateBtn.classList.add('processing');
}

const getImage = async () => {
  // إخفاء زر "Generate" وإظهار دائرة التحميل
  hideGenerateButton();
  showLoadingSpinner();

  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api}`
    },
    body: JSON.stringify({
      "prompt": inp.value,
      "n": 3,
      "size": "512x512",
    })
  }

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", methods);
    const data = await res.json();
    const ListImages = data.data;
    
    // مسح الصور القديمة
    images.innerHTML = '';

    // إظهار الصور الجديدة
    ListImages.map(photo => {
      const container = document.createElement("div");
      images.append(container);
      const img = document.createElement("img");
      container.append(img);
      img.src = photo.url;
    });
  } catch (error) {
    console.error("An error occurred while generating the images.", error);
  } finally {
    // إظهار زر "Generate" بعد اكتمال عملية التحميل
    showGenerateButton();
    hideLoadingSpinner();
  }
}

// إضافة مراقب لزر "Generate" لعرض دائرة التحميل عند النقر
generateBtn.addEventListener('click', () => {
  getImage();
});